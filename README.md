# Smart AI Resume Builder Platform

An advanced, full-stack AI platform designed to help job seekers optimize their resumes using Natural Language Processing (NLP).

## 🚀 Features

- **Multi-Page Dashboard**: Track your resume history and ATS performance.
- **ATS Score Analyzer**: Detailed compatibility scoring using TF-IDF and Cosine Similarity.
- **Skill Gap Analyzer**: Identifies missing technical skills and recommends learning resources.
- **Interactive Resume Builder**: Create professional resumes with real-time PDF-style preview.
- **Semantic Mapping**: Visualizes keyword importance using SpaCy word vectors.
- **Secure Auth**: JWT-based authentication for private resume storage.

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **Tailwind CSS v4** (Modern UI/UX)
- **Framer Motion** (Animations)
- **React Router** (Navigation)

### Backend
- **FastAPI** (Python)
- **SpaCy** (NLP Engine)
- **SQLModel** (Database ORM)
- **Scikit-learn** (Similarity Logic)

## 📦 Installation

### Backend Setup
1. `cd backend`
2. `python3 -m venv venv`
3. `source venv/bin/activate`
4. `pip install -r requirements.txt`
5. `python3 main.py`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 📊 Architecture
The project follows a modular service-oriented architecture. The NLP pipeline extracts keywords, calculates vector similarity, and generates actionable feedback based on industry-standard ATS filtering logic.

---
© 2025 Smart Resume Builder | Built with AI
