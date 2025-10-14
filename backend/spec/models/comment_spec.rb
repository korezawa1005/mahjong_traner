# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'validations' do
    it 'requires content to be present' do
      comment = build(:comment, content: '')

      expect(comment).not_to be_valid
      expect(comment.errors[:content]).to include('を入力してください')
    end

    it 'limits content length to 1000 characters' do
      comment = build(:comment, content: 'あ' * 1001)

      expect(comment).not_to be_valid
      expect(comment.errors[:content]).to include('は1000文字以内で入力してください')
    end

    it 'requires reviewer to have reviewer role' do
      reviewer = build(:user, role: :general)
      comment = build(:comment, reviewer: reviewer)

      expect(comment).not_to be_valid
      expect(comment.errors[:reviewer]).to include('must be a reviewer')
    end
  end

  describe 'scopes' do
    it '.recent returns comments in reverse chronological order' do
      older = create(:comment, created_at: 2.days.ago)
      newer = create(:comment, created_at: 1.day.ago)

      expect(Comment.recent).to eq([newer, older])
    end

    it '.for_user filters comments for the given user' do
      user = create(:user)
      comment_for_user = create(:comment, user: user)
      create(:comment) # someone else

      expect(Comment.for_user(user)).to match_array([comment_for_user])
    end
  end
end
