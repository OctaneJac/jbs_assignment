from fastapi import APIRouter
from .projects import router as projects_router
from .tasks import router as tasks_router

api_router = APIRouter()

api_router.include_router(projects_router, prefix="/projects", tags=["projects"])
api_router.include_router(tasks_router, prefix="/tasks", tags=["tasks"])