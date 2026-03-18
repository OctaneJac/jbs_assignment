"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from "@/lib/auth-client"
import ProjectCard from './project-card'
import { Project } from "@/lib/types"

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  // console.log('API URL:', apiUrl)
  const { data: session } = authClient.useSession()
  const user_id = session?.user.id

  async function fetchProjects()
  {
    try{
      const res = await fetch(`${apiUrl}/v1/project`,
      {
        method: 'GET',
        headers:{'content-type': 'application/json'},
      })
      const data = await res.json();
      setProjects(data);
      }
    catch(error){
      console.error('Error fetching projects:', error);
                }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreate = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${apiUrl}/v1/projects/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, user_id })
      })
      if (res.ok) {
        setName('')
        setDescription('')
        setShowForm(false)
        fetchProjects()
      } else {
        alert('Failed to create project')
      }
    } catch (err) {
      console.error(err)
      alert('Error creating project')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-tight">Project List</h1>
      <div className="mb-4 text-center">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Project'}
        </Button>
      </div>
      
      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 max-w-md mx-auto">
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      )}

      <div className="grid grid-cols-2 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onUpdate={fetchProjects} />
        ))}
      </div>
    </div>
  )
}