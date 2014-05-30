class Api::V1::DocumentsController < Api::V1::ApplicationController
  def update
    @document = Document.find params[:id]
    @document.update_attributes! document_params
    respond_with @document
  end

  private
    def document_params
      params.require(:document).permit(:content)
    end
end
