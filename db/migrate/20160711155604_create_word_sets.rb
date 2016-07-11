class CreateWordSets < ActiveRecord::Migration[5.0]
  def change
    create_table :word_sets do |t|
      t.text :words
      t.datetime :created_at
      t.datetime :last_update
      t.boolean :public
      t.boolean :uses_special
      t.text :name

      t.timestamps
    end
  end
end
