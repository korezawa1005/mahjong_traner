class CustomDeviseMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'

  def reset_password_instructions(record, token, opts = {})
    opts[:subject] = 'パスワードの再設定'
    opts[:reset_password_token] = token
    # React側にリダイレクトするURLに変更！
    opts[:redirect_url] = "http://localhost:8000/password/reset?token=#{token}"
    super
  end
end
