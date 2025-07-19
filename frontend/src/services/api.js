const baseUrl = "http://localhost:5000/api/tasks";

// Get all tasks with optional pagination
export async function getTasks(page = 1, limit = 10, search = '', status = '') {
  try {
    const params = new URLSearchParams({ page, limit, search, status });

    const res = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await res.json();

    return {
      tasks: data.tasks.map(task => ({ ...task, id: task._id })),
      total: data.total,
      completed: data.completed,
      page: data.page,
      totalPages: data.totalPages
    };
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return { tasks: [], total: 0, completed: 0, page: 1, totalPages: 1 };
  }
}

// Create a new task
export async function createTask(task) {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    return { ...data, id: data._id };
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
}

// Update an existing task
export async function updateTask(id, task) {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    return { ...data, id: data._id };
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}

// Delete a task
export async function deleteTask(id) {
  try {
    await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}

// Share a task with another user
export async function shareTask(taskId, userIdToShareWith) {
  try {
    const res = await fetch(`${baseUrl}/${taskId}/share`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userIdToShareWith }) // This must match backend field name
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to share task');
    }

    return await res.json();
  } catch (error) {
    console.error("Error in shareTask:", error);
    throw error;
  }
}
