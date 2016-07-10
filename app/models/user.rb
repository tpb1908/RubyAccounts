class User < ApplicationRecord
    attr_accessor :remember_token, :activation_token
    before_create :create_activation_digest
	before_save :downcase_email
	validates(:name, presence: true, length: { maximum: 50 })
	VALIDATE_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates(:email, presence: true, length: { maximum: 255 }, 
		format: {with: VALIDATE_EMAIL_REGEX}, uniqueness: { case_sensitive: false })
	has_secure_password
	validates(:password, presence: true, length: { minimum: 6 }, allow_nil: true)

	#Hash digest of a given string
	def User.digest(string)
		cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
		BCrypt::Password.create(string, cost: cost)
	end

    #New random token for cookie
    def User.new_token
        SecureRandom.urlsafe_base64
    end

    #Remembers a user in the database for use in persistent sessions
    def remember
        self.remember_token = User.new_token
        update_attribute(:remember_digest, User.digest(remember_token))
    end

    def forget
        update_attribute(:remember_digest, nil)
    end

    #Generalised authentication
    def authenticated?(attribute, token)
        digest = send("#{attribute}_digest")
        return false if digest.nil?
        BCrypt::Password.new(digest).is_password?(token)
    end

    def activate
        update_columns(activated: true, activated_at: Time.zone.now)
    end

    def send_activation_email
        UserMailer.account_activation(self).deliver_now
    end

    private

        def create_activation_digest
            self.activation_token = User.new_token
            self.activation_digest = User.digest(activation_token)
        end

        def downcase_email
            #Inside the User model, the self is option on the right side
            self.email = email.downcase
        end

end
