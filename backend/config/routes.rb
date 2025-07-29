Rails.application.routes.draw do
  devise_for :users,
    controllers: {
      sessions: 'users/sessions',defaults: { format: :json },
      registrations: 'users/registrations',
      passwords: 'users/passwords'
    } 
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'charts', to: 'charts#show'
      get 'current_user', to: 'current_user#show'
      get 'users/search', to: 'users#search' 
  
      resources :quizzes, only: [:index]
      resources :quiz_answers, only: [:create]
      resources :quiz_sessions, only: [:create, :update]
      resources :categories, only: [:index]
      resources :quiz_histories, only: [:index, :show]
    end
  end
end
