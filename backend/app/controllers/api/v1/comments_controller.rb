class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user! 
  before_action :set_target_user
  before_action :set_comment, only: %i[update destroy]
  before_action :ensure_reviewer!, only: %i[create update destroy]
  before_action :ensure_author!,   only: %i[update destroy]
  
  def serialize(c)
    {
      id:       c.id,
      content:  c.content,
      reviewer: { id: c.reviewer&.id, 
                  # name: c.reviewer&.username 
                },
      created_at: c.created_at.strftime('%Y/%m/%d %H:%M')
    }
  end

  def index
    comments = @target_user.received_comments.where(quiz_session_id: params[:quiz_session_id]).includes(:reviewer).order(created_at: :desc)  
  
    render json: comments.map { |c| serialize(c) }
  end

  def create
    comment = @target_user.received_comments.build(
      reviewer: current_user, 
      content: params[:content],
      quiz_session_id: params[:quiz_session_id] 
    )
    comment.save!
    render json: serialize(comment), status: :created
  end

  def update
    if @comment.update(content: params[:content])
      render json: serialize(@comment)
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def ensure_reviewer!
    head :forbidden unless current_user.role == 'reviewer'
  end

  def set_target_user
    @target_user = User.find(params[:user_id])
  end

  def set_comment
    @comment = @target_user.received_comments.find(params[:id])
  end

  def ensure_author!
    head :forbidden unless @comment.reviewer_id == current_user.id
  end

end