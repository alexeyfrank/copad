class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :own_documents, class_name: 'Document', foreign_key: :author_id
  # has_many :other_documents, class_name: 'Document'
end
