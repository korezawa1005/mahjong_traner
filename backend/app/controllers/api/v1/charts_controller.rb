class Api::V1::ChartsController < ApplicationController #API
  def show
    user = User.find(params[:user_id])
    session = QuizSession.find(params[:session_id])

    # 仮ロジック: 各カテゴリの正解数を出す例
    categories = Category.all
    labels = categories.map(&:name)
    data = categories.map do |cat|
      QuizAnswer.joins(:quiz)
        .where(quiz_session_id: session.id, quizzes: { category_id: cat.id })
        .where(correct: true).count
    end

    render json: { labels: labels, data: data }
  end
end