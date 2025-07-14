class Api::V1::ChartsController < ApplicationController
  before_action :authenticate_user!

  MAX_QUESTIONS = 10  

  def show
    # 各カテゴリで最新2つのセッションを取得
    latest_sessions = current_user.quiz_sessions
                                 .joins(:category)
                                 .order(created_at: :desc)
                                 .group_by(&:category_id)
                                 .transform_values { |sessions| sessions.first(2) }
    
    categories = Category.order(:id)
    labels = categories.pluck(:name)
    
    # 最新データ
    current_data = categories.map do |cat|
      session = latest_sessions[cat.id]&.first
      calculate_score(session)
    end
    
    # 前回データ  
    previous_data = categories.map do |cat|
      session = latest_sessions[cat.id]&.second
      calculate_score(session)
    end
    
    render json: { 
      labels: labels,
      current_data: current_data,
      previous_data: previous_data
    }
  end
  
  private
  
  def calculate_score(session)
    if session && session.correct_count
      ((session.correct_count.to_f / MAX_QUESTIONS) * 100).round
    else
      0
    end
  end
end