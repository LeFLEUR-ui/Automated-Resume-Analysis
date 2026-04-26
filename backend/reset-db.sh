#!/bin/bash
set -a
source .env
set +a

export PGPASSWORD=$DB_PASSWORD

echo "Resetting database: $DB_NAME on $DB_HOST..."

# This drops everything in the public schema and recreates it
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO $DB_USER; GRANT ALL ON SCHEMA public TO public;"

echo "Database reset! All tables and schemas in $DB_NAME have been wiped clean."
