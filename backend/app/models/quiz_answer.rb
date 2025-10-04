class QuizAnswer < ApplicationRecord
  belongs_to :quiz
  belongs_to :quiz_session
  belongs_to :selected_tile, class_name: 'Tile', optional: true

  validates :selected_decision, presence: true, if: -> { quiz&.decision_options.present? }
  validates :selected_calls, presence: true, if: -> { quiz&.call_options.present? }
end
