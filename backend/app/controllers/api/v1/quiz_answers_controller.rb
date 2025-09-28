class Api::V1::QuizAnswersController < ApplicationController
  def create
    answer = QuizAnswer.new(quiz_answer_params)

    if answer.save
      render json: { message: '保存成功', answer: answer }, status: :created
    else
      render json: { errors: answer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def quiz_answer_params
    params.require(:quiz_answer).permit(
      :quiz_id,
      :selected_tile_id,
      :selected_decision,
      :correct,
      :user_id,
      :quiz_session_id
    )
  end
end
