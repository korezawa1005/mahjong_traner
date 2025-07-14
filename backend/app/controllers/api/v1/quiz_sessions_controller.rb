class Api::V1::QuizSessionsController < ApplicationController
  def create
    quiz_session = QuizSession.new(user_id: current_user&.id, category_id: params[:category_id])

    if quiz_session.save
      render json: { id: quiz_session.id }
    else
      Rails.logger.error(quiz_session.errors.full_messages)
      render json: { errors: quiz_session.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
