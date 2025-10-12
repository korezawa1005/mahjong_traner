# frozen_string_literal: true

FactoryBot.define do
  factory :quiz_answer do
    quiz
    correct { false }

    after(:build) do |answer|
      answer.quiz_session ||= build(:quiz_session, category: answer.quiz.category)
      answer.selected_tile ||= answer.quiz.correct_tile
    end
  end
end
