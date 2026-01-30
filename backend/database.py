from sqlmodel import create_engine, SQLModel, Session
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get Database URL from environment or fallback to local SQLite
sqlite_url = os.getenv("DATABASE_URL", "sqlite:///./resume_builder.db")

# For SQLite, we need to disable same-thread check
connect_args = {"check_same_thread": False} if sqlite_url.startswith("sqlite") else {}

engine = create_engine(sqlite_url, connect_args=connect_args)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
