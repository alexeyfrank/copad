class Web::AccountsController < Web::ApplicationController
  layout 'layouts/account'

  def show
    @documents = current_user.own_documents
  end
end
