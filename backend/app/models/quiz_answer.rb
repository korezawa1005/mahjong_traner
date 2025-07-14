class QuizAnswer < ApplicationRecord
  belongs_to :quiz
  belongs_to :quiz_session
  belongs_to :selected_tile, class_name: "Tile"
end
