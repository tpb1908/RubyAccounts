class AddRandomOptionToWordSet < ActiveRecord::Migration[5.0]
  def change
  	add_column :word_sets, :should_randomise, :boolean, :default => false
  end
end
