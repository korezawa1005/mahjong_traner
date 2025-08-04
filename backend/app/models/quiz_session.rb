class QuizSession < ApplicationRecord
  belongs_to :user, optional: true # ユーザーログイン外も対応
  belongs_to :category
  has_many :quiz_answers, dependent: :destroy
  has_many :comments, dependent: :destroy
end
