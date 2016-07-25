class ChangeUserAverageWpmDefaultValue < ActiveRecord::Migration[5.0]
  def change
  	change_column :users, :average_wpm, :integer, :default => 0
  end
end
