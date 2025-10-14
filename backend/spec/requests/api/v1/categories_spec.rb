# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Categories', type: :request do
  describe 'GET /api/v1/categories' do
    it 'returns categories excluding リーチ判断' do
      include_category = create(:category, name: '基本問題')
      create(:category, name: 'リーチ判断')

      get api_v1_categories_path, as: :json

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      names = json.map { |c| c['name'] }
      expect(names).to include(include_category.name)
      expect(names).not_to include('リーチ判断')
    end
  end
end
