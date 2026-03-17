"use client"

import { Task } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TaskCardProps {
  task: Task
  onUpdate?: () => void
}

export default function TaskCard({ task, onUpdate }: TaskCardProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

  const handleRename = async () => {
    const newTitle = prompt("Enter new task title", task.title)
    if (!newTitle || newTitle === task.title) return

    try {
      const res = await fetch(`${apiUrl}/v1/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle })
      })

      if (res.ok) {
        onUpdate?.()
      } else {
        alert("Rename failed")
      }
    } catch (err) {
      console.error(err)
      alert("Error renaming task")
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) return

    try {
      const res = await fetch(`${apiUrl}/v1/tasks/${task.id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        onUpdate?.()
      } else {
        alert("Delete failed")
      }
    } catch (err) {
      console.error(err)
      alert("Error deleting task")
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'default'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'default'
      case 'in-progress': return 'secondary'
      case 'to-do': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <div className="flex">
            <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
            <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">{task.description}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </p>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={handleRename}>
            Rename
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}