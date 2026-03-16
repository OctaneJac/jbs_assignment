'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Task } from "@/lib/types";
import TaskCard from "./task-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<"to-do" | "in-progress" | "done" | "all">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const params = useParams();
  const projectId = (params as any).projects;

  // Fetch data from API
  async function fetchTasks() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/tasks?project_id=${projectId}`);
      const data = await res.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    if (!projectId) return
    fetchTasks();
  }, [projectId]);

  // Filter and sort logic
  useEffect(() => {
    let updatedTasks = [...tasks];
    if (statusFilter !== "all") {
      updatedTasks = updatedTasks.filter(task => task.status === statusFilter);
    }

    // sort by due_date
    updatedTasks.sort((a, b) => {
      const dateA = new Date(a.due_date).getTime();
      const dateB = new Date(b.due_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredTasks(updatedTasks);
  }, [statusFilter, sortOrder, tasks]);

  async function createTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: Number(projectId),
        title,
        description,
        status: "to-do",
        due_date: dueDate,
        priority
      })
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    fetchTasks();
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Task List</h1>

      {/* Create Task Form */}
      <form onSubmit={createTask} className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit">Create Task</Button>
      </form>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <Select
          value={statusFilter}
          onValueChange={(value: "to-do" | "in-progress" | "done" | "all") => setStatusFilter(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="to-do">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Sort Ascending</SelectItem>
            <SelectItem value="desc">Sort Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
        ))}
      </div>
    </div>
  );
}


