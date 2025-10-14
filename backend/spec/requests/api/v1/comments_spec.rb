# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Comments', type: :request do
  describe 'POST /api/v1/users/:user_id/comments' do
    let(:target_user) { create(:user) }
    let(:quiz_session) { create(:quiz_session, user: target_user) }
    let(:params) do
      {
        content: 'レビュー内容',
        quiz_session_id: quiz_session.id
      }
    end

    it 'forbids non-reviewers from creating comments' do
      non_reviewer = create(:user, role: :general)
      sign_in non_reviewer

      post api_v1_user_comments_path(target_user), params:, as: :json

      expect(response).to have_http_status(:forbidden)
      expect(Comment.count).to eq(0)
    end
  end

  describe 'GET /api/v1/users/:user_id/comments' do
    let(:target_user) { create(:user) }
    let(:reviewer) { create(:user, role: :reviewer) }
    let!(:quiz_session) { create(:quiz_session, user: target_user) }
    let!(:comment) do
      Comment.create!(
        user: target_user,
        reviewer: reviewer,
        quiz_session: quiz_session,
        content: 'レビュー'
      )
    end

    it 'forbids access for users other than reviewer or target user' do
      outsider = create(:user, role: :general)
      sign_in outsider

      get api_v1_user_comments_path(target_user), params: { quiz_session_id: quiz_session.id }, as: :json

      expect(response).to have_http_status(:forbidden)
    end
  end
end
