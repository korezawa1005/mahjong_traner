class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def current
    if user_signed_in?
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false }
    end
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      render json: { message: 'signed_out' }, status: :ok
    else
      render json: { message: 'already_signed_out' }, status: :unauthorized
    end
  end

end
