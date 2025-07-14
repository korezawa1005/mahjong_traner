class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_many :quiz_sessions, dependent: :destroy
  has_many :quiz_answers, through: :quiz_sessions
  has_many :comments, dependent: :destroy

  enum role: { general: 0, reviewer: 1, trainer: 2 }
end
