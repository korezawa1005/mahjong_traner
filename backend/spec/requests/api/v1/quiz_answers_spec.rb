# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::QuizAnswers', type: :request do
  describe 'POST /api/v1/quiz_answers' do
    let(:category) { create(:category) }
    let(:quiz_session) { create(:quiz_session, category: category) }
    let(:quiz) do
      create(:quiz,
             category: category,
             decision_options: [],
             call_options: [],
             quiz_tile_ids: [correct_tile.id],
             dora_indicator_tile_ids: [])
    end
    let(:correct_tile) { create(:tile) }

    let(:valid_params) do
      {
        quiz_answer: {
          quiz_id: quiz.id,
          quiz_session_id: quiz_session.id,
          selected_tile_id: correct_tile.id,
          correct: true,
          selected_calls: []
        }
      }
    end

    it 'creates a quiz answer when parameters are valid' do
      expect do
        post api_v1_quiz_answers_path, params: valid_params, as: :json
      end.to change(QuizAnswer, :count).by(1)

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('保存成功')
      expect(json['answer']['quiz_id']).to eq(quiz.id)
    end

    it 'returns unprocessable entity when validation fails' do
      quiz.update!(decision_options: %w[push fold], correct_decision: 'push')
      invalid_params = valid_params.deep_dup
      invalid_params[:quiz_answer].delete(:selected_decision)

      expect do
        post api_v1_quiz_answers_path, params: invalid_params, as: :json
      end.not_to change(QuizAnswer, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['errors']).to include(a_string_matching(/Selected decision/))
    end
  end
end
