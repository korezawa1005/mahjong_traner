class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :reviewer, class_name: "User"
  belongs_to :quiz_session

  validates :content, presence: true, length: { minimum: 1, maximum: 1000 }
  validate :reviewer_must_be_reviewer_role
  
  scope :recent, -> { order(created_at: :desc) }
  scope :for_user, ->(user) { where(user: user) }
  
  private
  
  def reviewer_must_be_reviewer_role
    unless reviewer&.reviewer?
      errors.add(:reviewer, 'must be a reviewer')
    end
  end
end