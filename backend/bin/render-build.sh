set -o errexit

cd backend

bundle install
bundle exec rails db:migrate