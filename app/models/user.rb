class User < ApplicationRecord
    attr_accessor :remember_token, :activation_token, :reset_token
    before_create :create_activation_digest
    before_destroy :destroy_private_sets
	before_save :downcase_email, :check_owner
    validate :unique_username_and_email
	validates(:name, presence: true, length: { maximum: 50 })
    validates(:username, presence: true, length: { maximum: 25 }, uniqueness: {case_sensitive: false })
	VALIDATE_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates(:email, presence: true, length: { maximum: 255 }, 
        format: {with: VALIDATE_EMAIL_REGEX}, uniqueness: { case_sensitive: false })
	has_secure_password
	validates(:password, presence: true, length: { minimum: 6 }, allow_nil: true)

    has_many :word_sets

	#Hash digest of a given string
	def User.digest(string)
		cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
		BCrypt::Password.create(string, cost: cost)
	end

    def self.search(search)
        where("username LIKE ?", "%#{search}%")
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
        update_columns(remember_digest: nil)
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

    def create_reset_digest
        self.reset_token = User.new_token
        update_columns(reset_digest: User.digest(reset_token), reset_sent_at: Time.zone.now)
    end

    def send_password_reset_email
        UserMailer.password_reset(self).deliver_now
    end

    def password_reset_expired?
        reset_sent_at < 2.hours.ago
    end

    private

        def create_activation_digest
            self.activation_token = User.new_token
            self.activation_digest = User.digest(activation_token)
        end

        def downcase_email
            #Inside the User model, the self is option on the right side
            self.email = email.downcase
            self.email = email.strip
        end

        def unique_username_and_email
            self.errors.add(:username, 'already taken') if User.exists?(email: username)
            self.errors.add(:email, 'already taken') if User.exists?(username: email)
            self.errors.each do |n|
                puts n
            end
        end

        def check_owner
            if self.owner
                self.admin = true
            end
        end

        def destroy_private_sets
            self.word_sets.where(:public => false).destroy_all
            self.word_sets.each do |n| n.update_attribute(:user_id, 1) end #Assign the rest to the system user???
        end

end
