# frozen_string_literal: true

require 'rails_helper'

RSpec.describe QuizAnswer, type: :model do
  describe 'validations for different quiz types' do
    it 'allows tile selection quizzes without additional fields' do
      quiz = create(:quiz)
      answer = build(:quiz_answer, quiz: quiz, selected_calls: [], selected_decision: nil)

      expect(answer).to be_valid
    end

    it 'requires selected_decision when quiz has decision options' do
      quiz = create(:quiz, decision_options: %w[push fold], correct_decision: 'push')
      answer = build(:quiz_answer, quiz: quiz, selected_decision: nil)

      expect(answer).not_to be_valid

      answer.selected_decision = 'push'
      expect(answer).to be_valid
    end

    it 'requires selected_calls when quiz has call options' do
      quiz = create(:quiz, call_options: %w[pon pass], correct_calls: %w[pon])
      answer = build(:quiz_answer, quiz: quiz, selected_calls: [])

      expect(answer).not_to be_valid

      answer.selected_calls = ['pon']
      expect(answer).to be_valid
    end
  end

  describe 'associations' do
    it 'requires a quiz' do
      answer = build(:quiz_answer)
      answer.quiz = nil

      expect(answer).not_to be_valid
      expect(answer.errors[:quiz]).to be_present
    end

    it 'requires a quiz_session' do
      answer = build(:quiz_answer)
      answer.quiz_session = nil

      expect(answer).not_to be_valid
      expect(answer.errors[:quiz_session]).to be_present
    end

    it 'allows selected_tile to be optional' do
      answer = build(:quiz_answer, selected_tile: nil)

      expect(answer).to be_valid
    end
  end
end
