export interface Project {
    name: string
    description?: string
    created_at: string
    id: number
    user_id: number
}

export interface Task{
  id: number;
  project_id: number;
  title: string;
  due_date: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "to-do" |  "in-progress" | "done";
  created_at: string;
}
