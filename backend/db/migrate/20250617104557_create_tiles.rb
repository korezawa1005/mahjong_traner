class CreateTiles < ActiveRecord::Migration[7.1]
  def change
    create_table :tiles do |t|
      t.string :name
      t.string :suit
      t.string :number
      t.string :image_url

      t.timestamps
    end
  end
end
