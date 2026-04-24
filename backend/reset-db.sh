#!/bin/bash
export PGPASSWORD='passwordnamin'
psql -h localhost -U postgres -d automated_resume_db -c "DROP TABLE IF EXISTS job_descriptions, candidates, hr_staffs, admins, users CASCADE;"
echo "Database reset! All relevant tables dropped."
