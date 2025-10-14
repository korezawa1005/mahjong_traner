# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    association :user
    association :reviewer, factory: %i[user reviewer]
    quiz_session
    content { "レビューコメント" }
  end
end
