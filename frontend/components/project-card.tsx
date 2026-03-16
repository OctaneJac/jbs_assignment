"use client"

import { Project } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ProjectCardProps {
  project: Project
  onUpdate?: () => void
}

export default function ProjectCard({ project, onUpdate }: ProjectCardProps) {
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

  const handleRename = async () => {
    const newName = prompt("Enter new project name", project.name)
    if (!newName || newName === project.name) return

    try {
      const res = await fetch(`${apiUrl}/v1/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName })
      })

      if (res.ok) {
        onUpdate?.()
      } else {
        alert("Rename failed")
      }
    } catch (err) {
      console.error(err)
      alert("Error renaming project")
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${project.name}"?`)) return

    try {
      const res = await fetch(`${apiUrl}/v1/projects/${project.id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        onUpdate?.()
      } else {
        alert("Delete failed")
      }
    } catch (err) {
      console.error(err)
      alert("Error deleting project")
    }
  }

  const handleOpen = () => {
    router.push(`/${project.id}/tasks`)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {project.description || 'No description available'}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Created: {new Date(project.created_at).toLocaleDateString()}
        </p>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={handleRename}>
            Rename
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <Button size="sm" onClick={handleOpen}>
            Open Project
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}