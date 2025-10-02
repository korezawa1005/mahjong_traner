class Api::V1::QuizzesController < ApplicationController
  def index
    category = Category.find_by(name: params[:category])
    return render json: { error: 'カテゴリが見つかりません' }, status: 404 unless category

    exclude_ids = params[:exclude_ids]&.split(',') || [] # 　今まで出題されたIDを受け取る 1問目は空の配列にする &をつけることによってnilでもエラーにならない
    quizzes = Quiz.includes(:correct_tile).where(category: category) # sampleでランダムに一問選んでる includes（:correct_tile）することによってN＋1問題を回避
    quizzes = quizzes.where.not(id: exclude_ids) if exclude_ids.any? # 　exclude_idsだけ省く

    quiz = quizzes.sample # quizにexclude_idだけ除いたものを入れる

    return render json: { error: 'クイズが見つかりません' }, status: 404 unless quiz

    puts quiz.correct_tile.image_url

    render json: {
      id: quiz.id,
      category: category.name,
      round_info: quiz.situation,
      quiz_tile_ids: quiz.quiz_tile_ids,
      hand_tile_urls: tile_urls_from_ids(quiz.quiz_tile_ids),
      hand_tiles: quiz.quiz_tile_ids.map do |id|
        tile = Tile.find(id)
        { id: tile.id, image_url: tile.image_url }
      end,
      discard_tile_urls: tile_urls_from_ids(quiz.dora_indicator_tile_ids),
      correct_tile_url: quiz.correct_tile.image_url,
      explanation: quiz.explanation,
      table_state: quiz.table_state,
      decision_options: quiz.decision_options,
      call_options: quiz.call_options
    }
  end


  def show
    quiz = Quiz.find(params[:id])
  
    ids   = (quiz.quiz_tile_ids + quiz.dora_indicator_tile_ids + [quiz.correct_tile_id]).compact.uniq
    tiles = Tile.where(id: ids).pluck(:id, :image_url).to_h
  
    hand_tiles = quiz.quiz_tile_ids.map { |id| { id:, image_url: tiles[id] } }
    dora_tiles = quiz.dora_indicator_tile_ids.map { |id| { id:, image_url: tiles[id] } }
  
    render json: {
      id: quiz.id,
      situation: quiz.situation,
      explanation: quiz.explanation,
      table_state: quiz.table_state,
      decision_options: quiz.decision_options,
      correct_decision: quiz.correct_decision,
      call_options: quiz.call_options,
      correct_calls: quiz.correct_calls,

      hand_tile_urls: hand_tiles.map { |t| t[:image_url] },
      dora_indicator_urls: dora_tiles.map { |t| t[:image_url] },
      correct_tile_url: tiles[quiz.correct_tile_id],
  
      hand_tiles: hand_tiles,
      dora_tiles: dora_tiles,
  
      accept_tiles_expanded: quiz.accept_tiles_expanded # ← 下のモデル実装が必要
    }
  end

  private

  def tile_urls_from_ids(ids)
    ids.map { |id| Tile.find(id).image_url } # whereだと重複したidは読み込まれないため使えない
  end
end
