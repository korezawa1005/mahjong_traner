class Api::V1::QuizzesController < ApplicationController
  def index
    category = Category.find_by(name: params[:category])
    return render json: { error: "カテゴリが見つかりません" }, status: 404 unless category

    quiz = Quiz.includes(:correct_tile).where(category: category).sample # sampleでランダムに一問選んでる
    return render json: { error: "クイズが見つかりません" }, status: 404 unless quiz

    render json: {
      id: quiz.id,
      category: category.name,
      round_info: quiz.situation,
      hand_tile_urls: tile_urls_from_ids(quiz.quiz_tile_ids),
      discard_tile_urls: tile_urls_from_ids(quiz.dora_indicator_tile_ids),
      correct_tile_id: quiz.correct_tile_id,
    }
  end

  private

  def tile_urls_from_ids(ids)
    ids.map { |id| Tile.find(id).image_url }
  end
end