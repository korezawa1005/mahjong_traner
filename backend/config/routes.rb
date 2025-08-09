Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: 'users/sessions', defaults: { format: :json },
               registrations: 'users/registrations',
               passwords: 'users/passwords'
             }
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'charts', to: 'charts#show'
      get 'charts/:user_id', to: 'charts#user_chart'
      get 'current_user', to: 'current_user#show'
      get 'users/search', to: 'users#search'
      get 'users/:user_id/quiz_histories/:id',
          to: 'quiz_histories#user_session'
      get :me, to: 'users#me'

      resources :quizzes, only: [:index]
      resources :quiz_answers, only: [:create]
      resources :quiz_sessions, only: %i[create update]
      resources :categories, only: [:index]
      resources :quiz_histories, only: %i[index show]
      resources :users, only: [:show] do
        get 'quiz_histories', to: 'quiz_histories#user_histories'
        resources :comments, only: %i[index create update destroy], controller: 'comments'
      end
    end
  end
end
