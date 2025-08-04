class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_reviewer!

  before_action :authenticate_user!, only: :me

  def me
    render json: {
      id:   current_user.id,
      role: current_user.role
    }
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
    unless current_user&.reviewer? || current_user&.admin?
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end