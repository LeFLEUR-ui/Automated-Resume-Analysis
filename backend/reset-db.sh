#!/bin/bash
sudo -u postgres psql -d automated_resume_db -c "TRUNCATE TABLE job_descriptions RESTART IDENTITY CASCADE;"
echo "Database cleared!"
