require 'uri'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  CALLBACK_PATH = '/oauth/google/callback'

  def google_oauth2
    auth = request.env['omniauth.auth']
    user = User.find_or_create_from_google(auth)

    if user.persisted?
      sign_in(user)
      token, _payload = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
      bearer_token = "Bearer #{token}"
      redirect_to oauth_redirect_url(token: bearer_token), allow_other_host: true
    else
      redirect_to oauth_redirect_url(error: 'authentication_failed'), allow_other_host: true
    end
  end

  def failure
    redirect_to oauth_redirect_url(error: params[:message] || 'authentication_failed'), allow_other_host: true
  end

  private

  def oauth_redirect_url(query = {})
    base_url = ENV['FRONTEND_APP_URL'].presence || 'http://localhost:5173'
    uri = URI.parse(base_url)
    uri.path = CALLBACK_PATH
    uri.query = query.to_query if query.present?
    uri.to_s
  end
end
