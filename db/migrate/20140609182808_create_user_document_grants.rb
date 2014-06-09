class CreateUserDocumentGrants < ActiveRecord::Migration
  def change
    create_table :user_document_grants do |t|
      t.integer :user_id
      t.integer :document_id

      t.timestamps
    end
  end
end
