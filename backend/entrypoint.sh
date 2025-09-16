set -e

echo "== ENTRYPOINT START =="
rm -f /app/tmp/pids/server.pid

echo "== RUN MIGRATE =="
bundle exec rails db:migrate

echo "== RUN SEED =="
bundle exec rails db:seed

echo "== STARTING SERVER =="
exec "$@"