Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'chart_data', to: 'charts#show'
    end
  end
end
