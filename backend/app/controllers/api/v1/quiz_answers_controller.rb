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
    permitted = params.require(:quiz_answer).permit(
      :quiz_id,
      :selected_tile_id,
      :selected_decision,
      :correct,
      :user_id,
      :quiz_session_id,
      selected_calls: []
    )

    # strong parameters returns {"selected_calls"=>[]} even when nil; normalize to nil for consistency
    if permitted.key?(:selected_calls)
      permitted[:selected_calls] = Array(permitted[:selected_calls]).reject(&:blank?)
    end

    permitted
  end
end
