class Web::DocumentsController < Web::ApplicationController
  layout 'layouts/document'

  def edit
    @document = Document.find params[:id]
    gon.current_document = @document
    gon.current_user = current_user
  end
end
