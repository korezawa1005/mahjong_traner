class Api::V1::CurrentUserController < ActionController::Base
  protect_from_forgery with: :null_session
  def show
    if current_user
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false }
    end
  end
end