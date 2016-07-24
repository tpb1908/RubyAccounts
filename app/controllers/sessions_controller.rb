class SessionsController < ApplicationController
  @@users_online = 0

  def new
  end

  def create
  	user = User.find_by(email: params[:session][:email].downcase)
  	if user && user.authenticate(params[:session][:password])
        if user.activated?
          log_in user
          params[:session][:remember_me] == '1' ? remember(user) : forget(user)
          @@users_online += 1
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

  def destroy
    if logged_in?
      log_out
      @@users_online -= 1
    end
    redirect_to root_url
  end

  def users_online
    render json:{count: @@users_online.to_s +  " user".pluralize(@@users_online) + " online"}
  end


end
