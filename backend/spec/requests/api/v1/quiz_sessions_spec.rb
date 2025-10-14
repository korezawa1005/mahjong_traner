# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::QuizSessions', type: :request do
  describe 'POST /api/v1/quiz_sessions' do
    let(:category) { create(:category) }

    it 'creates a quiz session and returns its id' do
      expect do
        post api_v1_quiz_sessions_path,
             params: { category_id: category.id },
             as: :json
      end.to change(QuizSession, :count).by(1)

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['id']).to be_present
    end

    it 'returns errors when category is missing' do
      expect do
        post api_v1_quiz_sessions_path, params: {}, as: :json
      end.not_to change(QuizSession, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['errors']).to be_present
    end
  end

  describe 'PATCH /api/v1/quiz_sessions/:id' do
    let(:quiz_session) { create(:quiz_session, correct_count: 0) }

    it 'updates the correct_count and returns success message' do
      patch api_v1_quiz_session_path(quiz_session),
            params: { correct_count: 5 },
            as: :json

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('QuizSession updated successfully')
      expect(json['correct_count']).to eq(5)
      expect(quiz_session.reload.correct_count).to eq(5)
    end

    it 'returns not found when session does not exist' do
      patch api_v1_quiz_session_path(0),
            params: { correct_count: 1 },
            as: :json

      expect(response).to have_http_status(:not_found)
    end
  end
end
