class RemoveAverageWpmFromUsers < ActiveRecord::Migration[5.0]
  def change
  	remove_column :users, :average_wpm
  end
end
