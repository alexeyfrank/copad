Copad::Application.routes.draw do
  root 'web/welcome#index'

  resource :rooms, only: [:index, :show, :new]
end
