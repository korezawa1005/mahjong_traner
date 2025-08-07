class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_reviewer!, except: [:me]

  def me
    if current_user
      render json: { id: current_user.id, role: current_user.role }
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end


  def search
    query = params[:query].to_s.strip
    return render json: [] if query.blank?

    users = User.where("email ILIKE :q", q: "%#{query}%")
                .select(:id, :email, :role)
                .limit(20)

    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  private

  def authorize_reviewer!
    head :forbidden unless current_user&.role == 'reviewer' 
  end
end