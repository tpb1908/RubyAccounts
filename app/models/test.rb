class Test < ApplicationRecord

	belongs_to :user
	has_one :word_set

end
