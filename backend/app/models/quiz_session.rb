class QuizSession < ApplicationRecord
  belongs_to :user, optional: true # ユーザーログイン外も対応
  belongs_to :category
end
