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

  enum role: { 
    general: 0,
    reviewer: 1   
  }
  
  # コメント関連の関連付け
  has_many :received_comments, class_name: 'Comment', foreign_key: 'user_id', dependent: :destroy
  has_many :written_comments, class_name: 'Comment', foreign_key: 'reviewer_id', dependent: :destroy
  
  # バリデーション
  validates :role, presence: true
  
  # レビュワーのみがコメント作成可能
  def can_write_comments?
    reviewer?  # reviewerのみ（trainerを除外）
  end
  
  # 全員がコメント閲覧可能
  def can_read_comments?
    true  # 全ユーザーが閲覧可能
  end
  
  def display_role
    case role
    when 'general' then '一般ユーザー'
    when 'reviewer' then 'レビュワー'
    else '不明'
    end
  end
  
  # スコープ
  scope :reviewers, -> { where(role: :reviewer) }
  scope :general_users, -> { where(role: :general) }

end
