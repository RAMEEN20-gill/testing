// test/taskRoutes.test.js
require('dotenv').config();
jest.setTimeout(10000);
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Task = require('../models/task'); // Adjust path if needed

let createdTaskId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await Task.deleteMany({ title: /Test Task/i }); // Cleanup test data
  await mongoose.connection.close();
});

describe('Task API Routes', () => {

  // POST - Create Task
  it('should create a new task', async () => {
    const response = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'Testing create route',
      status: 'Pending',
      dueDate: '2025-12-31',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Test Task');

    createdTaskId = response.body._id;
  });

  //  GET - All Tasks (with pagination)
  it('should return tasks with pagination', async () => {
    const res = await request(app).get('/api/tasks?page=1&limit=5');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('tasks');
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });

  //  GET - Single Task by ID
  it('should return a single task by ID', async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdTaskId);
  });

  //  PUT - Update Task
  it('should update the task', async () => {
    const res = await request(app).put(`/api/tasks/${createdTaskId}`).send({
      title: 'Test Task Updated',
      status: 'Completed'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Test Task Updated');
    expect(res.body.status).toBe('Completed');
  });

  //  DELETE - Delete Task
  it('should delete the task', async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

});
