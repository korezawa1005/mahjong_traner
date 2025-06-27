Rails.application.routes.draw do
  devise_for :users,
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords'
    } 
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  
  namespace :api do
    namespace :v1 do
      get 'chart_data', to: 'charts#show'

      resources :quizzes, only: [:index], defaults: { format: :json }
      resources :quiz_answers, only: [:create]
    end
  end
end
