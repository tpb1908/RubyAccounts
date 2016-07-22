class AddMeanCpmToWordSets < ActiveRecord::Migration[5.0]
  def change
    add_column :word_sets, :cpm, :integer
  end
end
