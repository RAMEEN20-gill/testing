const baseUrl = "http://localhost:5000/api/tasks";

export async function getTasks() {
  const res = await fetch(baseUrl);
  const data = await res.json();

  // Map _id to id for each task
  return data.map(task => ({
    ...task,
    id: task._id,
  }));
}

export async function createTask(task) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTask(id, task) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
