Copad::Application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope module: :web do
    root 'welcome#index'
    resources :users, only: [:new, :create]
    resources :documents, only: [:edit]

    resource :account, only: [:show] do
       scope :module => :account do
         resources :documents
       end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :documents
    end
  end

end
