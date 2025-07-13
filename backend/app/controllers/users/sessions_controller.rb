class Users::SessionsController < Devise::SessionsController
  respond_to :json
  
  def current
    if user_signed_in?
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false }
    end
  end
end