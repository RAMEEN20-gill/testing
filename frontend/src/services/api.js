const baseUrl = "http://localhost:5000/api/tasks";

// Get all tasks with optional pagination
export async function getTasks(page = 1, limit = 10, search = '', status = '') {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage.");
      return { tasks: [], total: 0, completed: 0, page: 1, totalPages: 1 };
    }

    const params = new URLSearchParams({ page, limit, search, status });

    const res = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Error fetching tasks:", res.statusText);
      return { tasks: [], total: 0, completed: 0, page: 1, totalPages: 1 };
    }

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
    const token = localStorage.getItem("token");
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}
