Copad::Application.routes.draw do
  root 'welcome#index'

  resource :rooms, only: [:index, :show]
end
