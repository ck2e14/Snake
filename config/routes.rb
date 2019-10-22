Rails.application.routes.draw do
  resources :scores, only: [:index, :show]
  resources :users, only: [:new, :create, :index, :show, :edit]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
