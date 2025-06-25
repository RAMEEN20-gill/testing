import '@testing-library/jest-dom'; 
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList';
import TaskDetails from '../TaskDetails';



describe('TaskForm Component', () => {
  it('renders all form fields', () => {
    render(<TaskForm onSave={jest.fn()} editTask={null} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
  });

  it('calls onSave when form is submitted', () => {
    const mockSave = jest.fn();
    render(<TaskForm onSave={mockSave} editTask={null} />);
    
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Pending' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2025-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: /Save Task/i }));
    
    expect(mockSave).toHaveBeenCalled();
  });
});

describe('TaskList Component', () => {
  const sampleTasks = [
    { _id: '1', title: 'Task 1', status: 'Pending', dueDate: '2025-12-01' },
    { _id: '2', title: 'Task 2', status: 'Completed', dueDate: '2025-12-02' }
  ];

  it('renders tasks', () => {
    render(
      <TaskList
        tasks={sampleTasks}
        onView={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});

describe('TaskDetails Component', () => {
  const task = {
    title: 'Test Task',
    description: 'Test Description',
    status: 'In Progress',
    dueDate: '2025-12-31',
    createdAt: new Date().toISOString()
  };

  it('displays task details correctly', () => {
    render(<TaskDetails task={task} />);
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
   expect(screen.getByText((text) => text.includes('12/31/2025'))).toBeInTheDocument();

  });
});
