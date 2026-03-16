from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import get_db
from app.models import Project
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@router.post("/create")
def create_project(project: dict, db: Session = Depends(get_db)):
    db_project = Project(**project)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()

    return {"message": "Project deleted"}


@router.put("/{project_id}")
def rename_project(project_id: int, data: dict, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if "name" in data:
        project.name = data["name"]

    if "description" in data:
        project.description = data["description"]

    db.commit()
    db.refresh(project)

    return project