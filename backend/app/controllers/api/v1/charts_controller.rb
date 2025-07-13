class Api::V1::ChartsController < ApplicationController
  before_action :authenticate_user!

  MAX_QUESTIONS = 10  

  def show
    latest = current_user.quiz_sessions
                         .order(created_at: :desc)
                         .group_by(&:category_id)      
                         .transform_values(&:first)     

    categories = Category.order(:id)
    labels = categories.pluck(:name)

    data = categories.map do |cat|
      session = latest[cat.id]
      if session && session.correct_count
        ((session.correct_count.to_f / MAX_QUESTIONS) * 100).round
      else
        0
      end
    end

    render json: { labels:, data: }
  end
end