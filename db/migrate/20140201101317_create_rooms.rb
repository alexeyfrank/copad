class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.text :code

      t.timestamps
    end
  end
end
