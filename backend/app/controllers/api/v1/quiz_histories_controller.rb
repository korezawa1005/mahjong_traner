class Api::V1::QuizHistoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_reviewer_or_self!, only: %i[user_histories]

  def index
    per  = (params[:per] || 10).to_i.clamp(1, 100)
    page = (params[:page] || 1).to_i
    
    quiz_sessions = current_user.quiz_sessions
                                .includes(:category)
                                .where.not(correct_count: nil)
                                .order(created_at: :desc)
                                .page(page).per(per)

    histories = quiz_sessions.map do |session|
      {
        id: session.id,
        category_name: session.category.name,
        correct_count: session.correct_count,
        total_questions: 10,
        created_at: session.created_at.strftime('%Y年%m月%d日')
      }
    end

    render json: {
      histories: histories,
      current_page: quiz_sessions.current_page,
      total_pages: quiz_sessions.total_pages,
      total_count: quiz_sessions.total_count
    }

  end

  def show
    quiz_session = current_user.quiz_sessions.find(params[:id])
    quiz_answers = quiz_session.quiz_answers.includes(:quiz, :selected_tile)

    details = quiz_answers.map do |answer|
      decision_options = answer.quiz&.decision_options || []
      correct_decision  = answer.quiz&.correct_decision
      selected_decision = answer.selected_decision
      {
        quiz_id: answer.quiz&.id,
        # クイズコントローラと同じ形式で hand_tiles を追加
        hand_tiles: answer.quiz&.quiz_tile_ids&.map do |id|
          tile = Tile.find(id)
          { id: tile.id, image_url: tile.image_url }
        end || [],
        selected_tile_id: answer.selected_tile&.id,
        selected_tile_name: answer.selected_tile&.name,
        correct_tile_id: answer.quiz&.correct_tile&.id,
        correct_tile_name: answer.quiz&.correct_tile&.name,
        correct: answer.correct,
        explanation: answer.quiz&.explanation,
        decision_options: decision_options,
        selected_decision: selected_decision,
        correct_decision: correct_decision

      }
    end

    session_info = {
      category_name: quiz_session.category&.name,
      correct_count: quiz_session.correct_count,
      total_questions: 10,
      created_at: quiz_session.created_at.strftime('%Y年%m月%d日 %H:%M')
    }

    render json: {
      details: details,
      session_info: session_info
    }
  end

  def user_histories
    per  = (params[:per] || 10).to_i.clamp(1, 100)
    page = (params[:page] || 1).to_i

    user = User.find(params[:user_id])

    quiz_sessions = user.quiz_sessions
                        .includes(:category)
                        .where.not(correct_count: nil)
                        .order(created_at: :desc)
                        .page(page).per(per)

    histories = quiz_sessions.map do |session|
      {
        id: session.id,
        category_name: session.category.name,
        correct_count: session.correct_count,
        total_questions: 10,
        created_at: session.created_at.strftime('%Y年%m月%d日')
      }
    end

    render json: {
      histories: histories,
      current_page: quiz_sessions.current_page,
      total_pages: quiz_sessions.total_pages,
      total_count: quiz_sessions.total_count
    }
  end

  def user_session
    user = User.find(params[:user_id])
    quiz_session = user.quiz_sessions.find(params[:id])

    quiz_answers = quiz_session.quiz_answers.includes(:quiz, :selected_tile)

    details = quiz_answers.map do |answer|
      decision_options = answer.quiz&.decision_options || []
      correct_decision  = answer.quiz&.correct_decision
      selected_decision = answer.selected_decision
      {
        quiz_id: answer.quiz&.id,
        hand_tiles: answer.quiz&.quiz_tile_ids&.map do |id|
          tile = Tile.find(id)
          { id: tile.id, image_url: tile.image_url }
        end || [],
        selected_tile_id: answer.selected_tile&.id,
        selected_tile_name: answer.selected_tile&.name,
        correct_tile_id: answer.quiz&.correct_tile&.id,
        correct_tile_name: answer.quiz&.correct_tile&.name,
        correct: answer.correct,
        explanation: answer.quiz&.explanation,
        decision_options: decision_options,
        selected_decision: selected_decision,
        correct_decision: correct_decision

      }
    end

    session_info = {
      category_name: quiz_session.category&.name,
      correct_count: quiz_session.correct_count,
      total_questions: 10,
      created_at: quiz_session.created_at.strftime('%Y年%m月%d日 %H:%M')
    }

    render json: {
      details: details,
      session_info: session_info
    }
  end

  def authorize_reviewer_or_self!
    return if current_user&.role == 'reviewer'
    return if params[:user_id].to_i == current_user.id

    head :forbidden
  end
end
