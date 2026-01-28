# 🚀 Smart ATS Resume Builder Platform

![Project Banner](assets/banner.png)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18405173.svg)](https://doi.org/10.5281/zenodo.18405173)


![Project Status](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_%7C_FastAPI_%7C_SpaCy-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Elevate your job search with the power of AI.** This platform doesn't just parse resumes—it intelligently optimizes them for modern Applicant Tracking Systems (ATS) using advanced Natural Language Processing.

---

## 🌟 Core Features

### 📋 **Interactive Resume Builder**
- **Real-time Preview:** See your PDF-style resume evolve as you type.
- **ATS-Friendly Templates:** Structured to ensure 100% parseability by HR software.
- **Modular Sections:** Easily manage education, experience, and skills.

### 🔍 **ATS Score Analyzer**
- **Cosine Similarity:** Mathematical validation of your resume against job descriptions.
- **Semantic Matching:** Goes beyond keywords to understand context using SpaCy word vectors.
- **Feedback Engine:** Actionable advice on how to improve your match score.

### ⚡ **Skill Gap Analysis**
- **Smart Identification:** Automatically detects missing technical and soft skills.
- **Learning Roadmap:** Direct links to learning resources (Coursera/Udemy) to bridge identifying gaps.

### 🗺️ **Keyword Heatmap**
- **Visual Intelligence:** A heatmap-inspired UI showing which of your skills are high-impact vs. weak for a specific role.

### 📊 **Performance Dashboard**
- **History Tracking:** Save multiple resumes and track your score improvement over time.
- **Role Analytics:** Compare your fit across different job titles.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **React 19** + **Vite** (Ultra-fast build tool)
- **Tailwind CSS v4** (Premium dark-themed UI components)
- **Framer Motion** (Smooth, professional animations)
- **Lucide React** (Consistent, high-quality iconography)

### **Backend**
- **FastAPI** (Python) - High performance, asynchronous API.
- **SpaCy (en_core_web_sm)** - The industry standard for Industrial-strength NLP.
- **SQLModel** - Modern SQLAlchemy-based ORM for SQLite.
- **Scikit-learn** - TF-IDF Vectorization and similarity algorithms.

---

## 📦 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Daaksh05/smart-ats-resume-builder.git
cd smart-ats-resume-builder
```

### 2️⃣ Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 The NLP Pipeline

Our custom analysis engine follows a four-stage process:
1. **Extraction:** PDF/Docx parsing into raw text.
2. **Preprocessing:** Lemma-based normalization and stop-word removal.
3. **Vectorization:** TF-IDF calculation for technical importance.
4. **Scoring:** Weighted aggregation of Cosine Similarity and Semantic Overlap.

---

## 📂 Project Structure

```text
├── backend/
│   ├── nlp/           # Logic for keywords & similarity
│   ├── services/      # Business logic (ATS, Skill Gap)
│   ├── auth/          # JWT & User identity
│   └── database.py    # Persistent storage engine
└── frontend/
    ├── src/pages/     # Feature-specific platform pages
    ├── src/components/# Reusable UI components
    └── src/layout/    # Global wrap & navigation
```

---
## 📖 Citation

If you use this software in academic or professional work, please cite it as:
@software{daakshayani2026smartats,
  author  = {Daakshayani, N. S.},
  title   = {Smart ATS Resume Builder},
  year    = {2026},
  version = {1.0.0},
  doi     = {10.5281/zenodo.18405173},
  url     = {https://github.com/Daaksh05/smart-ats-resume-builder}
}

---
Daakshayani, N. S. (2026). Smart ATS Resume Builder (Version 1.0.0) [Computer software]. 
https://doi.org/10.5281/zenodo.18405173
---

## 🤝 Contributing
Contributions are welcome! Whether it's a bug fix, new feature, or documentation improvement, please feel free to fork and open a PR.

---
© 2025 Smart Resume Builder | Built with ❤️ for Developers
