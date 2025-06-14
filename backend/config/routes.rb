Rails.application.routes.draw do
  devise_for :users,
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
  namespace :api do
    namespace :v1 do
      get 'chart_data', to: 'charts#show'
    end
  end
end
