# Mariwasa Automated Resume Analysis System (ARAS)
### *Revolutionizing Recruitment with AI-Driven Intelligence*

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Cache-Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

---

## 🌟 Introduction
The **Mariwasa Automated Resume Analysis System (ARAS)** is an enterprise-grade recruitment ecosystem designed to streamline the hiring lifecycle for **Mariwasa Siam Ceramics Inc.** By leveraging advanced Natural Language Processing (NLP) and real-time data synchronization, ARAS transforms unstructured resume data into actionable insights, enabling HR teams to identify top talent with surgical precision.

---

## 🚀 Core Ecosystem: The Three Portals

### 1. 👤 Candidate Portal
*   **Smart Upload**: Drag-and-drop resume upload with instant AI parsing.
*   **Preview & Verify**: A dedicated interface for candidates to review and correct AI-extracted data before final submission.
*   **AI Match Scoring**: Immediate feedback on how well their profile aligns with the specific job requirements.
*   **Application Tracking**: A real-time timeline view of application statuses (Pending, Under Review, Accepted, Rejected).
*   **Unified Profile**: Centralized management of professional experience, education, and skills.

### 2. 🏢 HR Screening Portal
*   **Intelligent Dashboard**: Real-time analytics on total resumes, application trends, and candidate distribution.
*   **Advanced Screening**: A high-fidelity interface to view applicants sorted by AI Match Scores.
*   **Job Management**: Full CRUD capabilities for job postings with the ability to Archive/Unarchive roles.
*   **Deep Profile Analysis**: Detailed view of candidate skills (Matched vs. Missing), experience relevance, and education hierarchy.
*   **Real-time Notifications**: Instant WebSocket alerts for new applications and registrations.

### 3. 🛡️ Admin Control Center
*   **User Management**: Oversight of all accounts across the system.
*   **Audit Logging**: Detailed tracking of system-wide activities for security and compliance.
*   **System Health**: Monitoring of rate limits and background service performance.

---

## 🧠 AI Intelligence Layer

### 📄 Resume Parsing Engine
The system utilizes specialized extractors to transform PDF and DOCX files into structured JSON data:
- **NER (Named Entity Recognition)**: Extracts contact details and personal information.
- **Contextual Classifiers**: Categorizes professional experience and identifies education levels.
- **Skill Aggregator**: Uses a weighted dictionary and pattern matching to identify technical and soft skills.

### 🎯 Smart Matching Logic
The "Match Score" is calculated using a multi-factor algorithm:
1.  **Skills Alignment (50%)**: Direct comparison of candidate skills against required job competencies.
2.  **Experience Relevance (30%)**: Analyzes years of experience and job title similarity.
3.  **Education Hierarchy (20%)**: Weighted scoring based on the level of degree (Doctorate > Masters > Bachelors > Associate).

---

## 🛠️ Technical Architecture

### **The Stack**
- **Frontend**: React 19 (Vite), Tailwind CSS (Premium Glassmorphism Design), Lucide Icons, Recharts (Data Visualization).
- **Backend**: FastAPI (Python 3.12), SQLAlchemy 2.0 (Async Engine).
- **Database**: PostgreSQL (Relational Data), Redis (Rate Limiting & Caching).
- **Security**: JWT (JSON Web Tokens), BCrypt Hashing, Role-Based Access Control (RBAC).

### **Infrastructure Enhancements**
- **Redis Caching**: Frequently accessed data (Job lists, HR metrics, Profiles) are cached in Redis to reduce database load and ensure <100ms response times.
- **Rate Limiting**: Integrated `slowapi` with Redis to prevent spamming of the AI parsing engine (5 uploads per minute limit).
- **WebSocket Manager**: A dedicated service for real-time, role-aware notification broadcasting.

---

## 📖 User Manual: Getting Started

### **For Candidates**
1.  **Sign Up**: Create an account via the Registration page.
2.  **Smart Upload**: Navigate to the "Careers" page, select a job, and click "Smart Upload".
3.  **Verify**: Review the data the AI extracted. If the AI missed a skill, you can manually add it in the next step.
4.  **Submit**: Confirm your application. You can track its progress in your Candidate Dashboard.

### **For HR Personnel**
1.  **Dashboard**: Monitor the "Application Trends" chart to see hiring spikes.
2.  **Screening**: Use the "Screening Portal" to see the "Best Match" candidates first.
3.  **Manage Jobs**: Create new job descriptions via the "Job Management" portal. Use the "Archive" feature to temporarily hide filled roles.
4.  **Notifications**: Keep an eye on the notification bell for instant updates on new applicants.

---

## 💻 Installation & Deployment

### **Prerequisites**
- **Node.js** (v18+)
- **Python** (v3.10+)
- **PostgreSQL** (Running)
- **Redis Server** (Running on port 6379)

### **Quick Start**
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/LeFLEUR-ui/Automated-Resume-Analysis.git
    cd Automated-Resume-Analysis
    ```

2.  **Configure Environment**:
    Create a `.env` file in the `backend/` directory (see `.env.example`).

3.  **Launch the System**:
    Use the unified development CLI:
    - **Linux/macOS**: `chmod +x start.sh && ./start.sh`
    - **Windows**: `powershell ./start.ps1`

4.  **Access Portals**:
    - **Frontend**: [http://localhost:5173](http://localhost:5173)
    - **API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🎨 Design Standards
ARAS follows a **Premium Enterprise Aesthetic**:
- **Palette**: Mariwasa Ruby (#D60041) paired with Slate 900 for high-contrast professional feel.
- **Glassmorphism**: Layers utilize backdrop blurs and subtle borders to establish depth.
- **Micro-interactions**: Every button and card includes active scaling and hover transitions for a "living" UI.

---
© 2026 Mariwasa Siam Ceramics Inc. - Advanced Recruitment Technologies.
