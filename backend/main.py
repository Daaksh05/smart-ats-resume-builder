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
    file: UploadFile = File(None),
    job_description: str = Form(...),
    manual_resume_text: str = Form(None)
):
    try:
        resume_text = ""
        
        if manual_resume_text:
            print("Using manual text input for analysis")
            resume_text = manual_resume_text
        elif file:
            print(f"Starting analysis for file: {file.filename}")
            content = await file.read()
            resume_text = extract_text(content, file.filename)
        else:
            raise HTTPException(status_code=400, detail="Please upload a file or paste your resume text.")

        print(f"Extracted/Provided text length: {len(resume_text)} chars")
        
        if not resume_text or len(resume_text.strip()) < 10:
            if file and not manual_resume_text:
                raise HTTPException(
                    status_code=400, 
                    detail="Could not extract text from the file. This PDF may be image-based (scanned). Please upload a text-based PDF or DOCX file, or paste your text manually."
                )
            else:
                raise HTTPException(status_code=400, detail="Provided text is too short for analysis.")
        
        results = analyze_ats(resume_text, job_description)
        print(f"Analysis complete - Score: {results.get('overall_score', 0)}")
        return results
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
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

@app.post("/api/ats/analyze-sample")
async def analyze_sample(
    job_description: str = Form(...)
):
    try:
        sample_path = os.path.join(os.path.dirname(__file__), "sample_resume.docx")
        if not os.path.exists(sample_path):
             # Try parent dir if not found (vercel structure)
             sample_path = os.path.join(os.path.dirname(__file__), "..", "backend", "sample_resume.docx")
             
        if not os.path.exists(sample_path):
            raise HTTPException(status_code=404, detail="Sample resume file not found on server.")

        with open(sample_path, "rb") as f:
            content = f.read()
            
        resume_text = extract_text(content, "sample_resume.docx")
        results = analyze_ats(resume_text, job_description)
        # Add a flag to indicate this was a sample
        results["is_sample"] = True
        return results
    except Exception as e:
        print(f"Error during sample analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
