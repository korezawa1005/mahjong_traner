class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    auth = request.env['omniauth.auth']
    user = User.find_or_create_from_google(auth)

    if user.persisted?
      sign_in(user)
      token, _payload = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
      response.set_header('Authorization', "Bearer #{token}")
      render json: {
        message: 'ログインに成功しました',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }, status: :ok
    else
      render json: { errors: ['認証に失敗しました'] }, status: :unauthorized
    end
  end

  def failure
    render json: { errors: ['認証に失敗しました'] }, status: :unauthorized
  end
end
