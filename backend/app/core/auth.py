from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.core.config import get_db
from app.models import User

def get_current_user(request: Request, db: Session = Depends(get_db)):
    session_user_id = request.cookies.get("user_id")  

    if not session_user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")

    user = db.query(User).filter(User.id == session_user_id).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid session")

    return user