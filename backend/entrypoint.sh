#!/bin/bash
set -e

echo "== ENTRYPOINT START =="
rm -f /app/tmp/pids/server.pid

echo "== RUN MIGRATE =="
bundle exec rails db:migrate

# SEEDは毎回やる必要なし。コメントアウト推奨。
# echo "== RUN SEED =="
# bundle exec rails db:seed

echo "== STARTING SERVER =="
exec bundle exec puma -C config/puma.rb