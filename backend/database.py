from sqlmodel import create_engine, SQLModel, Session
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get Database URL from environment or fallback to local SQLite
# On Vercel, always use SQLite in /tmp to avoid external DB connection issues
if os.getenv("VERCEL"):
    DATABASE_URL = "sqlite:////tmp/resume_builder.db"
else:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./resume_builder.db")

# For SQLite, we need to disable same-thread check
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
