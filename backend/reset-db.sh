#!/bin/bash
set -a
source .env
set +a

export PGPASSWORD=$DB_PASSWORD

echo "Resetting database: $DB_NAME on $DB_HOST..."

# This drops everything in the public schema and recreates it
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO $DB_USER; GRANT ALL ON SCHEMA public TO public;"

echo "Clearing uploads directory..."
rm -rf uploads/resumes/*
rm -rf uploads/resume_images/*
mkdir -p uploads/resumes
mkdir -p uploads/resume_images

echo "Database and uploads reset! All tables and uploaded files have been wiped clean."

echo "Seeding database with test job..."
python3 seed-db.py
