import sys
import os

# Add backend to path
sys.path.append(os.getcwd())

from services.ats_service import analyze_ats

resume = "John Doe. Software Engineer with experience in Python, React, and FastAPI. Skills: SQL, Docker, AWS."
jd = "Looking for a Software Engineer with Python and React skills. Experience with Docker is a plus."

try:
    results = analyze_ats(resume, jd)
    print("MATCH SUCCESS:")
    print(results)
except Exception as e:
    print("MATCH FAILED:")
    print(e)
