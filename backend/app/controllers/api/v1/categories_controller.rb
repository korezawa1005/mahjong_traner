class Api::V1::CategoriesController < ApplicationController
  respond_to :json
  def index
    categories = Category.where.not(name: 'リーチ判断')
    render json: categories
  end
end
