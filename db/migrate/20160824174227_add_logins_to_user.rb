class AddLoginsToUser < ActiveRecord::Migration[5.0]
  def change
  	add_column :users, :logins, :varchar, array:true
  end
end
