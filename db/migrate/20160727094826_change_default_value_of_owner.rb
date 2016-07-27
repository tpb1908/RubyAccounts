class ChangeDefaultValueOfOwner < ActiveRecord::Migration[5.0]
  def change
  	change_column :users, :owner, :boolean, :default => false
  end
end
