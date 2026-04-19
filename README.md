# Mariwasa Automated Resume Analysis System

A comprehensive, role-based recruitment portal and resume analysis system designed for Mariwasa Siam Ceramics Inc. The platform utilizes advanced NLP and machine learning to optimize the recruitment process, providing specialized interfaces for candidates, HR personnel, and system administrators.

---

## System Overview

### Candidate Features
*   Automated Application Flow: Resume upload with AI-driven parsing for PDF and DOCX formats.
*   Candidate Dashboard: Real-time application tracking, upcoming interview schedules, and profile strength analytics.
*   Application Tracking System (ATS): Detailed timeline view of the recruitment lifecycle.
*   Unified Profile Management: Centralized control for personal information, professional experience, and account security.

### HR and Recruitment Features
*   Candidate Screening Portal: AI-powered "Match Score" calculation comparing candidate profiles against job requirements.
*   Job Management: Centralized control for job postings, including status management (Active/Inactive) and departmental categorization.
*   HR Dashboard: Overview of recruitment metrics, pipeline status, and candidate distribution.
*   Interview Orchestration: Integrated modals for scheduling interviews and reviewing detailed candidate profiles.

### Administrative Features
*   User Access Control: Management of portal access levels (Admin, HR, Candidate).
*   System Monitoring: Oversight of system-wide activities and audit logs.

---

## Core Intelligence: Job Recommendation Engine

The matching engine utilizes Natural Language Processing (NLP) to perform contextual analysis of resumes against job descriptions.

*   Skill Extraction: Implements SpaCy for Named Entity Recognition (NER) to identify technical competencies, certifications, and experience levels from unstructured text.
*   Semantic Analysis: Utilizes RoBERTa (Robustly Optimized BERT Approach) for contextual understanding of professional experience.
*   Compatibility Scoring: Text is embedded into high-dimensional vectors, and similarity is measured to determine the alignment between candidates and requirements.

---

## Technical Stack

### Frontend
*   Core: React.js (Vite)
*   Styling: Tailwind CSS (Custom glassmorphism design system)
*   Iconography: Lucide React
*   State Management: React Hooks / Local Storage
*   Routing: React Router

### Backend
*   API Framework: FastAPI (Python)
*   Language Processing: SpaCy, Transformers (RoBERTa)
*   Containerization: Docker

### Database and Infrastructure
*   Database: PostgreSQL
*   BaaS: Supabase (Authentication, Storage, Real-time DB)

---

## Project Structure

### Frontend Directory Structure
```text
frontend/
├── public/                # Static assets
├── src/
│   ├── assets/            # Project images and icons
│   ├── components/
│   │   ├── admin/         # Admin-specific components
│   │   ├── candidate/     # Candidate dashboard and tracking components
│   │   ├── hr/            # HR screening, dashboard, and job management
│   │   ├── layout/        # Header and Footer components
│   │   └── modals/        # Reusable modal components
│   │       ├── hr/        # HR-specific modals
│   │       └── shared/    # Application and Recruitment terms modals
│   ├── data/              # Mock data and constants
│   ├── pages/
│   │   ├── admin/         # Admin portal pages
│   │   ├── candidate/     # Candidate portal pages
│   │   ├── hr/            # HR portal pages
│   │   ├── publicPages/   # Authentication and Site-wide pages
│   │   └── shared/        # Unified Profile and Settings pages
│   ├── App.jsx            # Main application component and routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles and Tailwind directives
├── index.html             # HTML template
├── package.json           # Frontend dependencies
└── vite.config.js         # Vite configuration
```

### Backend Directory Structure
```text
backend/
├── app/                   # FastAPI application source
│   ├── controllers/       # API endpoints
│   ├── services/          # Core business logic
│   ├── models/            # Database schemas
|   ├── schemas/           # Represents the API
|   ├── utils/             # Auths, and others
|   ├── extractors/        # Email, Phone Number, Education, Experience extractors
|   ├── ml/                # NLP, SpaCy, Sentence-Transformers
│   └── main.py            # Backend entry point
|   └── database.py        # Interacts with Async PostgreSQL
├── Dockerfile             # Container configuration
└── requirements.txt       # Python dependencies
└── .env                   # Environment Variables
```

---

## Development Environment

The system includes a Unified Development CLI to manage the frontend, backend, and infrastructure concurrently.

### System Architecture
```text
       +---------------------------------------+
       |       Mariwasa Smart Dev CLI          |
       |     (start.sh  /  start.ps1)          |
       +---------------------------------------+
                |              |
      __________V__________    |    __________V__________
     |                     |   |   |                     |
     |   Frontend (Vite)   |<--+-->|   Backend (FastAPI) |
     |   Port: 5173        |       |   Port: 8000        |
     |_____________________|       |_____________________|
                                              |
                                     _________V_________
                                    |                   |
                                    |   Supabase / DB   |
                                    |   PostgreSQL      |
                                    |___________________|
```

---

## Installation and Setup

### Prerequisites
*   Node.js v18.0 or higher
*   Python v3.10 or higher
*   PostgreSQL v14.0 or higher

### Deployment Instructions

#### Linux / macOS
```bash
chmod +x start.sh
./start.sh
```

#### Windows (PowerShell)
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
./start.ps1
```

---

## Design Standards

The platform adheres to a Premium Enterprise Design System:
*   Brand Integration: Centralized around the Mariwasa Corporate Palette (#D10043).
*   Glassmorphism: Use of layered shadows and backdrop blurs to establish visual hierarchy.
*   Responsive Architecture: Optimized for a consistent experience across desktop and mobile devices.
*   Interactive Feedback: High-fidelity micro-animations and transition effects for enhanced engagement.

---
Mariwasa Siam Ceramics Inc. Recruitment Portal
