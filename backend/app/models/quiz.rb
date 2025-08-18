class Quiz < ApplicationRecord
  belongs_to :category
  belongs_to :correct_tile, class_name: 'Tile' # これを記載することでquiz.correct_tileでTileオブジェクトが取れる
  has_many :quiz_answers, dependent: :destroy

  def accept_tiles_expanded
    return [] if accept_tiles.blank?
    names = accept_tiles.keys.uniq
    dict  = Tile.where(name: names).pluck(:name, :image_url).to_h
    accept_tiles.map { |name, cnt|
      { name:, count: cnt.to_i, image_url: dict[name] }
    }.sort_by { |h| -h[:count] }
  end
end
