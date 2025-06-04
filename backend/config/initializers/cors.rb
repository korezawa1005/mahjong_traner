Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:8000", "https://www.本番環境のURLがあるならここにも追加"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end