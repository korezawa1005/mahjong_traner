class Quiz < ApplicationRecord
  belongs_to :category
  belongs_to :correct_tile, class_name: "Tile"
end
