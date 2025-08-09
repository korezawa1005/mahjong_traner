class Users::PasswordsController < Devise::PasswordsController
  respond_to :json

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    if successfully_sent?(resource)
      render json: { message: 'メールを送信しました。' }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      render json: { message: 'パスワードを変更しました。' }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def resource_params
    params.require(:user).permit(:email, :reset_password_token, :password, :password_confirmation)
  end
end
