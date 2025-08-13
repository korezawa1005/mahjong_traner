class Api::V1::CurrentUserController < ActionController::Base
  protect_from_forgery with: :null_session
  def show
    if current_user
      render json: {
        logged_in: true,
        user: {
          id: current_user.id,
          name: current_user.name,
          email: current_user.email,
          role: current_user.role
        }
      }
    else
      render json: {
        logged_in: false,
        user: nil
      }
    end
  end
end
