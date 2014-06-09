class Document < ActiveRecord::Base
  belongs_to :author, class_name: "User"


  has_many :user_document_grants
  has_many :users, through: :user_document_grants

  accepts_nested_attributes_for :users
end
