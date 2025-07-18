class Category < ApplicationRecord
  has_many :quiz_sessions, dependent: :destroy
  has_many :quizzes, dependent: :destroy
end
