class Web::DocumentsController < Web::ApplicationController
  layout 'layouts/document'

  def edit
    @document = current_user.documents.find_by id: params[:id]
    if @document
      gon.current_document = @document
      gon.current_user = current_user
    else
      redirect_to account_path
    end
  end
end
