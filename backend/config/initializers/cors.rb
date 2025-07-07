Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:8000", "https://mahjong-traner-ui.onrender.com"

    resource "*",
      headers: :any,
      expose: ['Authorization'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true # サーバー側が「認証情報付きリクエスト」を受け入れる許可
  end
end