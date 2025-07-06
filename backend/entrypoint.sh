#!/bin/bash
set -e

rm -f /app/tmp/pids/server.pid
bundle exec rails db:migrate
bundle exec rails db:seed

exec "$@"