# frozen_string_literal: true

FactoryBot.define do
  factory :quiz_session do
    category
    association :user
    correct_count { 0 }
  end
end
