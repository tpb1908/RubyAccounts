Rails.application.routes.draw do


  root 'static_pages#home'
  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get  '/edit', to: 'users#edit'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  post 'users/delete', to: 'users#delete'
  post 'word/delete', to: 'word#delete'
  get 'password_resets/new'
  get 'password_resets/edit'
  get 'users/new'
  get 'sessions/new'
  get 'tests/get', to: 'word#get'
  get 'sessions/users_online', to: 'sessions#users_online'
  get '/generate', to: 'word#generate'
  post '/pulse', to: 'sessions#pulse'
  post '/tests/new', to: 'word#create'
  get '/tests/new', to: 'word#new'
  get '/tests', to: 'word#index'
  get '/tests/:id', to: 'word#show'
  resources :users
  resources :word
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :create, :edit, :update]
end
