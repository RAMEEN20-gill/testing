const baseUrl = "http://localhost:5000/api/tasks";

// Get all tasks
export async function getTasks() {
  try {
    const res = await fetch(baseUrl);
    const data = await res.json();

    // Map _id to id for consistent frontend use
    return data.map(task => ({
      ...task,
      id: task._id,
    }));
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
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
    return { ...data, id: data._id }; // ✅ ensure frontend gets 'id'
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
    return { ...data, id: data._id }; // ✅ ensure frontend gets 'id'
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
