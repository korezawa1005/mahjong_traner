#!/bin/bash
set -e

echo "== ENTRYPOINT START =="
rm -f /app/tmp/pids/server.pid

if [ "$RAILS_ENV" = "test" ]; then
  echo "== SKIP MIGRATE/SEED IN TEST ENVIRONMENT =="
else
  echo "== RUN MIGRATE =="
  bundle exec rails db:migrate

  echo "== RUN SEED =="
  bundle exec rails db:seed
fi

echo "== STARTING SERVER =="
exec bundle exec puma -C config/puma.rb
