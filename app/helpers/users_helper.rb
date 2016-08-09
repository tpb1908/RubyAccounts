module UsersHelper

  # Returns the Gravatar for the given user.
  def gravatar_for(user, options = { size:80 })
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
    image_tag(gravatar_url, alt: user.name, class: "gravatar", size: options[:size].to_s+"x"+options[:size].to_s)
  end

  def current_user
    @current_user ||= User.find(session[:user_id])
  rescue
    ActiveRecord::RecordNotFound
        cookies.delete(:user_id)
        cookies.delete(:remember_token)
        #redirect_to root_url
  end

end