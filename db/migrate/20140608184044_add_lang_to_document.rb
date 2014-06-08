class AddLangToDocument < ActiveRecord::Migration
  def change
    add_column :documents, :lang, :string
  end
end
