class Web::Account::DocumentsController < Web::Account::ApplicationController
  def index
    @documents = current_user.own_documents
    @document = Document.new
  end


  def edit
    @document = current_user.own_documents.find params[:id]
  end

  def update
    @document = current_user.own_documents.find params[:id]

    if @document.update_attributes document_params
      redirect_to edit_account_document_path(@document)
    else
      render :edit
    end
  end

  def new
    @document = Document.new
  end

  def create
    @document = current_user.own_documents.create document_params

    if @document
      redirect_to edit_account_document_path(@document)
    else
      render :new
    end
  end

  def destroy
    @document = current_user.own_documents.find params[:id]
    @document.destroy
    redirect_to account_documents_path
  end



  private
    def document_params
      params.require(:document).permit(:title, :lang)
    end
end
