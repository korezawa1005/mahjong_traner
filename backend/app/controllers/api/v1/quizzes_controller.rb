class Api::V1::QuizzesController < ApplicationController
  
  def index
    category = Category.find_by(name: params[:category])
    return render json: { error: "カテゴリが見つかりません" }, status: 404 unless category
    
    exclude_ids = params[:exclude_ids]&.split(",") || [] #　今まで出題されたIDを受け取る 1問目は空の配列にする &をつけることによってnilでもエラーにならない
    quizzes = Quiz.includes(:correct_tile).where(category: category)# sampleでランダムに一問選んでる includes（:correct_tile）することによってN＋1問題を回避
    quizzes = quizzes.where.not(id: exclude_ids) if exclude_ids.any? #　exclude_idsだけ省く

    quiz = quizzes.sample # quizにexclude_idだけ除いたものを入れる

    return render json: { error: "クイズが見つかりません" }, status: 404 unless quiz

    puts quiz.correct_tile.image_url

    render json: {
      id: quiz.id,
      category: category.name,
      round_info: quiz.situation,
      quiz_tile_ids: quiz.quiz_tile_ids,
      hand_tile_urls: tile_urls_from_ids(quiz.quiz_tile_ids),
      hand_tiles: quiz.quiz_tile_ids.map { |id|
        tile = Tile.find(id)
        { id: tile.id, image_url: tile.image_url }
      },
      discard_tile_urls: tile_urls_from_ids(quiz.dora_indicator_tile_ids),
      correct_tile_url: quiz.correct_tile.image_url,
      explanation: quiz.explanation
    }
  end

  private

  def tile_urls_from_ids(ids)
    ids.map { |id| Tile.find(id).image_url } # whereだと重複したidは読み込まれないため使えない
  end
end