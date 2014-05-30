class Web::Account::DocumentsController < Web::Account::ApplicationController
  def index
    @documents = current_user.own_documents
    @document = Document.new
  end

  def create
    @document = current_user.own_documents.create document_params

    if @document
      redirect_to edit_document_path(@document)
    else
      render :index
    end
  end


  private
    def document_params
      params.require(:document).permit(:title)
    end
end
