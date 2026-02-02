from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
import os

# Local imports
from database import init_db, get_session
from auth.routes import router as auth_router
from parser import extract_text
from services.ats_service import analyze_ats
from services.skill_gap import analyze_skill_gap

app = FastAPI(title="Smart Resume Builder Platform API")

# Setup database on startup
@app.on_event("startup")
def on_startup():
    init_db()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Welcome to the Smart Resume Builder Platform API"}

@app.get("/api/health")
def health():
    return {"status": "healthy", "database": "connected" if os.getenv("DATABASE_URL") else "sqlite"}

@app.post("/api/ats/analyze")
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:
        print(f"Starting analysis for file: {file.filename}")
        content = await file.read()
        resume_text = extract_text(content, file.filename)
        print(f"Extracted text length: {len(resume_text)}")
        results = analyze_ats(resume_text, job_description)
        print("Analysis complete")
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ats/skill-gap")
async def skill_gap(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:
        content = await file.read()
        resume_text = extract_text(content, file.filename)
        results = analyze_skill_gap(resume_text, job_description)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
