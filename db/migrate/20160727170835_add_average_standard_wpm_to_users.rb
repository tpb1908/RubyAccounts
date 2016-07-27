class AddAverageStandardWpmToUsers < ActiveRecord::Migration[5.0]
  def change
  		add_column :users, :average_standard_wpm, :integer, :default => 0
  end
end
