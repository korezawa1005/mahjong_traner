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

  def update
    quiz_session = QuizSession.find(params[:id])

    Rails.logger.info("Updating QuizSession #{quiz_session.id} with correct_count: #{params[:correct_count]}")

    if quiz_session.update(correct_count: params[:correct_count])
      render json: {
        message: 'QuizSession updated successfully',
        quiz_session_id: quiz_session.id,
        correct_count: quiz_session.correct_count
      }
    else
      Rails.logger.error(quiz_session.errors.full_messages)
      render json: { errors: quiz_session.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
