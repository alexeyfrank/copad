class Web::DocumentsController < Web::ApplicationController
  layout 'layouts/document'

  def edit
    @document = current_user.documents.find_by(id: params[:id])
    if Document.find(params[:id]).author == current_user || @document
      gon.current_document = Document.find(params[:id])
      gon.current_user = current_user
    else
      redirect_to account_path
    end
  end
end
