# frozen_string_literal: true

require 'rails_helper'
require 'warden/jwt_auth'

RSpec.describe 'Api::V1::Comments', type: :request do
  def auth_headers_for(user)
    token, = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
    {
      'HTTP_AUTHORIZATION' => "Bearer #{token}",
      'ACCEPT' => 'application/json',
      'CONTENT_TYPE' => 'application/json'
    }
  end

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
      headers = auth_headers_for(non_reviewer)

      post api_v1_user_comments_path(target_user), params:, headers:, as: :json

      expect(response).to have_http_status(:forbidden)
      expect(Comment.count).to eq(0)
    end

    it 'allows reviewers to create comments' do
      reviewer = create(:user, role: :reviewer)
      headers = auth_headers_for(reviewer)

      expect do
        post api_v1_user_comments_path(target_user), params:, headers:, as: :json
      end.to change(Comment, :count).by(1)

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body['content']).to eq('レビュー内容')
      expect(body['reviewer']['id']).to eq(reviewer.id)
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

    it 'requires authentication' do
      get api_v1_user_comments_path(target_user),
          params: { quiz_session_id: quiz_session.id },
          headers: { 'ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json' },
          as: :json

      expect(response).to have_http_status(:unauthorized)
    end

    it 'forbids access for users other than reviewer or target user' do
      outsider = create(:user, role: :general)
      headers = auth_headers_for(outsider)

      get api_v1_user_comments_path(target_user),
          params: { quiz_session_id: quiz_session.id },
          headers: headers,
          as: :json

      expect(response).to have_http_status(:forbidden)
    end
  end
end
