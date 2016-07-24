class SessionsController < ApplicationController
  $count = 0;

  def new
  end

  def create
  	user = User.find_by(email: params[:session][:email].downcase)
  	if user && user.authenticate(params[:session][:password])
        if user.activated?
          log_in user
          params[:session][:remember_me] == '1' ? remember(user) : forget(user)
          $count += 1
          puts 'Count is ' + $count.to_s
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
      $count -= 1
      puts 'Count is ' + $count.to_s
    end
    redirect_to root_url
  end


end
