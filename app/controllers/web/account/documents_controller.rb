class Web::Account::DocumentsController < Web::Account::ApplicationController
  def index
    @documents = current_user.documents
  end
end
