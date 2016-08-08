class ChangeDefaultValueOfWordSetPublic < ActiveRecord::Migration[5.0]
  def change
  	change_column :word_sets, :public, :boolean, :default => true
  end
end
