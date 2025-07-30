class Api::V1::QuizHistoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    quiz_sessions = current_user.quiz_sessions
                               .includes(:category)
                               .where.not(correct_count: nil)
                               .order(created_at: :desc)
                               .limit(20)

    histories = quiz_sessions.map do |session|
      {
        id: session.id,
        category_name: session.category.name,
        correct_count: session.correct_count,
        total_questions: 10,
        created_at: session.created_at.strftime("%Y年%m月%d日")
      }
    end

    render json: { histories: histories }
  end

  def show
    quiz_session = current_user.quiz_sessions.find(params[:id])
    quiz_answers = quiz_session.quiz_answers.includes(:quiz, :selected_tile)
    
    details = quiz_answers.map do |answer|
      {
        quiz_id: answer.quiz&.id,
        # クイズコントローラと同じ形式で hand_tiles を追加
        hand_tiles: answer.quiz&.quiz_tile_ids&.map { |id|
          tile = Tile.find(id)
          { id: tile.id, image_url: tile.image_url }
        } || [],
        selected_tile_id: answer.selected_tile&.id,
        selected_tile_name: answer.selected_tile&.name,
        correct_tile_id: answer.quiz&.correct_tile&.id,
        correct_tile_name: answer.quiz&.correct_tile&.name,
        correct: answer.correct,
        explanation: answer.quiz&.explanation

      }
    end
    
    session_info = {
      category_name: quiz_session.category&.name,
      correct_count: quiz_session.correct_count,
      total_questions: 10,
      created_at: quiz_session.created_at.strftime("%Y年%m月%d日 %H:%M")
    }
    
    render json: { 
      details: details,
      session_info: session_info
    }
  end

  def user_histories
    user = User.find(params[:user_id])

    quiz_sessions = user.quiz_sessions
                        .includes(:category)
                        .where.not(correct_count: nil)
                        .order(created_at: :desc)
                        .limit(20)

    histories = quiz_sessions.map do |session|
      {
        id: session.id,
        category_name: session.category.name,
        correct_count: session.correct_count,
        total_questions: 10,
        created_at: session.created_at.strftime("%Y年%m月%d日")
      }
    end

    render json: { histories: histories }
  end

end