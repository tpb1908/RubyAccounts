class AddAverageWpmForHeroku < ActiveRecord::Migration[5.0]
  def change
  	add_column :users, :average_wpm, :integer, :default => 0
  end
end
