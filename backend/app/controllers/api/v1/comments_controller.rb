class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user! 
  before_action :ensure_reviewer!, only: :create
  before_action :set_target_user

  def index
    comments = @target_user.received_comments.includes(:reviewer).order(created_at: :desc)  
  
    render json: comments.map { |c|
    {
      id:         c.id,
      content:    c.content,
      reviewer:   { id: c.reviewer.id },
      created_at: c.created_at.strftime('%Y/%m/%d %H:%M')
    }
  }
  
  end

  def create
    comment = @target_user.received_comments.build(
      reviewer: current_user, content: params[:content]
    )
    comment.save!
    render json: comment, status: :created
  end

  private

  def ensure_reviewer!
    head :forbidden unless current_user.role == 'reviewer'
  end

  def set_target_user
    @target_user = User.find(params[:user_id])
  end
end