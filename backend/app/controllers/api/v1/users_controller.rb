class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_reviewer!

  def search
    query = params[:query].to_s.strip
    return render json: [] if query.blank?

    users = User.where("email ILIKE :q", q: "%#{query}%")
                .select(:email, :role)
                .limit(20)

    render json: users
  end

  private

  def authorize_reviewer!
    unless current_user&.reviewer? || current_user&.admin?
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end