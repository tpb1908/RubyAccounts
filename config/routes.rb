Rails.application.routes.draw do
  get 'users/new'

  get 'sessions/new'

  root 'static_pages#home'
  get  '/help',    to: 'static_pages#help', as: 'help'
  get  '/about',   to: 'static_pages#about', as: 'about'
  get  '/contact', to: 'static_pages#contact', as: 'contact'
  get  '/signup',  to: 'users#new', as: 'signup'
  post '/signup',  to: 'users#create'
  get '/edit', to: 'users#edit', as: 'edit'
  get    '/login',   to: 'sessions#new', as: 'login'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
end
