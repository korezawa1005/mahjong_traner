# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "ユーザー#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "Password123" }
    role { :general }
  end
end
