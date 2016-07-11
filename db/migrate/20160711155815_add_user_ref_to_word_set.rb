class AddUserRefToWordSet < ActiveRecord::Migration[5.0]
  def change
    add_reference :word_sets, :user, foreign_key: true
  end
end
