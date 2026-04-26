import re
from difflib import SequenceMatcher
<<<<<<< HEAD

# Degree hierarchy for education matching
DEGREE_HIERARCHY = {
    "SENIOR HIGH SCHOOL": 1,
=======
from app.models.job_description import JobDescription

# Basic hierarchy for education comparison
DEGREE_HIERARCHY = {
    "SENIOR HIGH SCHOOL": 1,
    "SHS": 1,
>>>>>>> 5106f13 (Restored and fixed Job Matching system, Header WebSocket, and Resume Analysis UI. Added debug logs and database migrations for target_role.)
    "DIPLOMA/VOCATIONAL": 2,
    "ASSOCIATE": 3,
    "BACHELOR": 4,
    "MASTER": 5,
<<<<<<< HEAD
    "DOCTORATE": 6
}


def _normalize_skill(skill: str) -> str:
    """Normalize a skill string for comparison."""
    s = skill.strip().lower()
    # Remove common suffixes/variations
=======
    "DOCTORATE": 6,
    "PHD": 6
}

def _normalize_skill(s: str) -> str:
    """Normalize a skill string for comparison."""
    if not s:
        return ""
    s = s.lower().strip()
    # Remove common suffixes/versions to improve matching (e.g., React.js -> react)
>>>>>>> 5106f13 (Restored and fixed Job Matching system, Header WebSocket, and Resume Analysis UI. Added debug logs and database migrations for target_role.)
    s = re.sub(r'\.js$', '', s)
    s = re.sub(r'[^a-z0-9+#/ ]', '', s)
    return s.strip()


def _tokenize_skills(skills_str: str) -> list[str]:
    """Split a skills string into individual normalized tokens."""
    if not skills_str:
        return []
    
    # Split by pipe, comma, semicolon, or bullet
    raw = re.split(r'[|,;•\-]', skills_str)
    skills = []
    for s in raw:
        cleaned = _normalize_skill(s)
        if cleaned and len(cleaned) > 1:
            skills.append(cleaned)
    return skills


def _fuzzy_match(a: str, b: str, threshold: float = 0.75) -> bool:
    """Check if two skill strings are a fuzzy match."""
    if a == b:
        return True
    # Check if one contains the other
    if a in b or b in a:
        return True
    # Use SequenceMatcher for fuzzy comparison
    ratio = SequenceMatcher(None, a, b).ratio()
    return ratio >= threshold


def calculate_skills_match(resume_skills: str, job_skills: str) -> dict:
    """
    Compare resume skills against job requirements.
    Returns match ratio and lists of matched/missing skills.
    """
    resume_tokens = _tokenize_skills(resume_skills)
    job_tokens = _tokenize_skills(job_skills)
    
    if not job_tokens:
        return {"score": 1.0, "matched": [], "missing": []}
    if not resume_tokens:
        return {"score": 0.0, "matched": [], "missing": job_tokens}
    
    matched = []
    missing = []
    
    for job_skill in job_tokens:
        found = False
        for resume_skill in resume_tokens:
            if _fuzzy_match(resume_skill, job_skill):
                matched.append(job_skill)
                found = True
                break
        if not found:
            missing.append(job_skill)
    
    score = len(matched) / len(job_tokens) if job_tokens else 0.0
    return {"score": score, "matched": matched, "missing": missing}


def _extract_years_from_text(text: str) -> int:
    """Extract years of experience mentioned in a job description."""
    if not text:
        return 0
    
    patterns = [
        r'(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp)',
        r'(?:minimum|at least|min)\s*(?:of\s+)?(\d+)\s*(?:years?|yrs?)',
        r'(\d+)\+?\s*(?:years?|yrs?)\s*(?:relevant|professional|work)',
    ]
    
    max_years = 0
    for pattern in patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for m in matches:
            try:
                max_years = max(max_years, int(m))
            except ValueError:
                continue
    
    return max_years


def calculate_experience_match(resume_years: int, job_description: str) -> float:
    """
    Compare resume years of experience against job requirements.
    Returns a score from 0.0 to 1.0.
    """
    required_years = _extract_years_from_text(job_description)
    
    if required_years == 0:
        # No explicit requirement — give full marks if candidate has any experience
        return 1.0 if resume_years and resume_years > 0 else 0.5
    
    if not resume_years or resume_years <= 0:
        return 0.2  # Some credit for applying
    
    if resume_years >= required_years:
        return 1.0
    
    # Proportional score
    return round(resume_years / required_years, 2)


def _extract_education_requirement(text: str) -> str:
    """Extract the education level required from a job description."""
    if not text:
        return ""
    
    text_upper = text.upper()
    
    # Check from highest to lowest
    checks = [
        ("DOCTORATE", [r"PH\.?D", r"DOCTORATE", r"DOCTOR"]),
        ("MASTER", [r"MASTER", r"MBA", r"GRADUATE\s+DEGREE"]),
        ("BACHELOR", [r"BACHELOR", r"BS\b", r"BA\b", r"B\.S\b", r"COLLEGE\s+DEGREE", r"UNDERGRADUATE"]),
        ("ASSOCIATE", [r"ASSOCIATE", r"2.YEAR\s+DEGREE"]),
        ("DIPLOMA/VOCATIONAL", [r"DIPLOMA", r"VOCATIONAL", r"TESDA", r"CERTIFICATE"]),
        ("SENIOR HIGH SCHOOL", [r"SENIOR\s+HIGH", r"SHS", r"HIGH\s+SCHOOL"]),
    ]
    
    for degree_label, patterns in checks:
        for p in patterns:
            if re.search(p, text_upper):
                return degree_label
    
    return ""


def calculate_education_match(resume_degree: str, job_description: str) -> float:
    """
    Compare resume education against job requirements.
    Returns a score from 0.0 to 1.0.
    """
    required_degree = _extract_education_requirement(job_description)
    
    if not required_degree:
        # No explicit requirement — give full marks
        return 1.0
    
    if not resume_degree:
        return 0.3  # Some credit
    
    resume_level = DEGREE_HIERARCHY.get(resume_degree.upper(), 0)
    required_level = DEGREE_HIERARCHY.get(required_degree.upper(), 0)
    
    if resume_level == 0 or required_level == 0:
        return 0.5  # Can't determine — neutral score
    
    if resume_level >= required_level:
        return 1.0
    
    # Proportional score
    return round(resume_level / required_level, 2)


def calculate_match_score(resume_data: dict, job) -> dict:
    """
    Calculate the overall match score between a parsed resume and a job.
<<<<<<< HEAD
    
    Weights:
    - Skills: 50%
    - Experience: 30%
    - Education: 20%
=======
>>>>>>> 5106f13 (Restored and fixed Job Matching system, Header WebSocket, and Resume Analysis UI. Added debug logs and database migrations for target_role.)
    """
    # Skills matching (50%)
    resume_skills = resume_data.get("skills", "")
    job_skills = job.skills_requirements or ""
    skills_result = calculate_skills_match(resume_skills, job_skills)
    
    # Experience matching (30%)
    resume_years = resume_data.get("years_experience", 0) or 0
    job_desc = (job.description or "") + " " + (job.skills_requirements or "")
    experience_score = calculate_experience_match(resume_years, job_desc)
    
    # Education matching (20%)
    resume_degree = resume_data.get("highest_degree", "")
    education_score = calculate_education_match(resume_degree, job_desc)
    
    # Weighted composite
    match_percentage = round(
        (skills_result["score"] * 0.50 +
         experience_score * 0.30 +
         education_score * 0.20) * 100,
        1
    )
    
    # Cap at 100
    match_percentage = min(match_percentage, 100.0)
    
    return {
        "job_id": job.job_id,
        "job_title": job.job_title,
        "department": job.department,
        "location": job.location,
        "job_type": job.job_type.value if job.job_type else None,
        "match_percentage": match_percentage,
        "skills_score": round(skills_result["score"] * 100, 1),
        "experience_score": round(experience_score * 100, 1),
        "education_score": round(education_score * 100, 1),
        "matched_skills": [s.title() for s in skills_result["matched"]],
        "missing_skills": [s.title() for s in skills_result["missing"]]
    }


async def match_resume_to_all_jobs(db, resume_data: dict) -> list[dict]:
    """
    Match parsed resume data against all active jobs in the database.
<<<<<<< HEAD
    Returns a list of match results sorted by match_percentage descending.
=======
>>>>>>> 5106f13 (Restored and fixed Job Matching system, Header WebSocket, and Resume Analysis UI. Added debug logs and database migrations for target_role.)
    """
    from sqlalchemy.future import select
    from app.models.job_description import JobDescription
    
    result = await db.execute(
        select(JobDescription).filter(JobDescription.is_active == True)
    )
    jobs = result.scalars().all()
    
    matches = []
    for job in jobs:
        match_result = calculate_match_score(resume_data, job)
        matches.append(match_result)
    
    # Sort by match percentage descending
    matches.sort(key=lambda x: x["match_percentage"], reverse=True)
    
    return matches


async def match_resume_to_job(db, resume_data: dict, job_id: str) -> dict | None:
    """
    Match parsed resume data against a single specific job.
    """
    from sqlalchemy.future import select
    from app.models.job_description import JobDescription
    
    result = await db.execute(
        select(JobDescription).filter(JobDescription.job_id == job_id)
    )
    job = result.scalars().first()
    
    if not job:
        return None
    
    return calculate_match_score(resume_data, job)
