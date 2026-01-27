from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    full_name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    resumes: List["Resume"] = Relationship(back_populates="user")

class Resume(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content_text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="resumes")

class ResumeCreate(SQLModel):
    title: str
    content_text: str

class UserCreate(SQLModel):
    email: str
    password: str
    full_name: str

class Token(SQLModel):
    access_token: str
    token_type: str
