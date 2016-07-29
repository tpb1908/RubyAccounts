class SessionsController < ApplicationController
  @user
  @@users_online = 0
  def new
  end

  def create
    puts params[:session]
    user = User.find_by("email = ? OR username = ? ", params[:session][:identifier].downcase, params[:session][:identifier].downcase)
  	if user && user.authenticate(params[:session][:password])
        if user.activated?  
          log_in user
          params[:session][:remember_me] == '1' ? remember(user) : forget(user)
          user.touch
          @user = user
          redirect_back_or user
        else
          flash[:warning] = "Account not activated. Check your email for the activation link"
          redirect_to root_url
        end
        
  	else
  		flash.now[:danger] = 'Invalid email/password combination'
  		render 'new'
  	end 
  end

  def pulse
    puts 'Pulse method called'
    if @user
      @user.poke
    end
  end

  def destroy
    if logged_in?
      log_out
    end
    redirect_to root_url
  end

  def self.count_users
    online = User.where('updated_at > ?', DateTime.now - 15.minutes)
    puts 'Users online is ' + online.count.to_s
    @@users_online = online.count
  end

  def users_online
    puts 'Get call'
    puts @@users_online
    render json:{count: @@users_online.to_s +  " user".pluralize(@@users_online) + " online"}
  end


end
