class Quiz < ApplicationRecord
  belongs_to :category
  belongs_to :correct_tile, class_name: "Tile" # これを記載することでquiz.correct_tileでTileオブジェクトが取れる
end
