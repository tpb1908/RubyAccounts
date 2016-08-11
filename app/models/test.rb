class Test < ApplicationRecord

	validates(:cpm, :inclusion => 0..1000)

	serialize :params, JSON

	belongs_to :user
	belongs_to :word_set
	has_one :word_set


	private 

		def valid_params
			puts 'Checking params'
			puts self.params
		end
end
