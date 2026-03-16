from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = 'postgresql://neondb_owner:npg_erldOquG3c7b@ep-sparkling-brook-a1avjedb-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    secret_key: str = '2xo8bumKjzjxXCx6MauXwqQhVNN4CziJ'
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"

settings = Settings()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()