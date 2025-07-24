import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const TaskForm = ({ initialData = {}, onSubmit, isEditing }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [status, setStatus] = useState(initialData.status || "pending");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "pending");
    }
  }, [initialData, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    if (file) {
      formData.append("attachment", file);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label>Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Attachment (optional)</Label>
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <Button type="submit">{isEditing ? "Update Task" : "Create Task"}</Button>
    </form>
  );
};

export default TaskForm;
