class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  has_many :quiz_sessions, dependent: :destroy
  has_many :quiz_answers, through: :quiz_sessions
  has_many :comments, dependent: :destroy

  enum role: {
    general: 0,
    reviewer: 1
  }

  has_many :received_comments, class_name: 'Comment', foreign_key: 'user_id', dependent: :destroy
  has_many :written_comments, class_name: 'Comment', foreign_key: 'reviewer_id', dependent: :destroy

  validates :role, presence: true

  def can_write_comments?
    reviewer?
  end

  def can_read_comments?
    true
  end

  def display_role
    case role
    when 'general' then '一般ユーザー'
    when 'reviewer' then 'レビュワー'
    else '不明'
    end
  end

  scope :reviewers, -> { where(role: :reviewer) }
  scope :general_users, -> { where(role: :general) }
end
