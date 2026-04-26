#!/bin/bash
set -a
source .env
set +a

export PGPASSWORD=$DATABASE_PASSWORD

echo "Resetting database: automated_resume_db..."

# This drops everything in the public schema and recreates it
psql -h localhost -U postgres -d automated_resume_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;"

echo "Database reset! All tables and schemas have been wiped clean."
