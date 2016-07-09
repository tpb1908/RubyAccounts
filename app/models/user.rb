class User < ApplicationRecord
	before_save {self.email = email.downcase} #Inside the User model, the self is option on the right side
	validates(:name, presence: true, length: { maximum: 50 })
	VALIDATE_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates(:email, presence: true, length: { maximum: 255 }, 
		format: {with: VALIDATE_EMAIL_REGEX}, uniqueness: { case_sensitive: false })
	validates(:password, presence: true, length: { minimum: 6 })

	has_secure_password
end
