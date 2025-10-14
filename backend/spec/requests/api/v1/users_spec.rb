# frozen_string_literal: true

require 'rails_helper'
require 'warden/jwt_auth'

RSpec.describe 'Api::V1::Users', type: :request do
  def auth_headers_for(user)
    token, = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
    {
      'HTTP_AUTHORIZATION' => "Bearer #{token}",
      'ACCEPT' => 'application/json',
      'CONTENT_TYPE' => 'application/json'
    }
  end

  describe 'GET /api/v1/me' do
    it 'returns unauthorized when not logged in' do
      get api_v1_me_path,
          headers: { 'ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json' },
          as: :json

      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns current user info when logged in' do
      user = create(:user)
      headers = auth_headers_for(user)

      get api_v1_me_path, headers:, as: :json

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['id']).to eq(user.id)
      expect(body['role']).to eq(user.role)
    end
  end
end
