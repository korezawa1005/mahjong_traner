class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com" # 本番環境の場合はこちらのメールアドレスを自分が使っているメールアドレスに変える
  layout "mailer"
end
