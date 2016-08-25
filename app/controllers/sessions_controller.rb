class SessionsController < ApplicationController
  @user
  @@users_online = 0
  def new
  end
  #Fix formatting
    def create
        user = User.find_by("email = ? OR username = ? ", params[:session][:identifier].downcase, params[:session][:identifier].downcase)
  	    if user
          if user.authenticate(params[:session][:password])
            if user.activated?  
              if check_login_count user 
                log_in user
                params[:session][:remember_me] == '1' ? remember(user) : forget(user)
                user.logins.clear
                user.save
                @user = user
                redirect_back_or user
              else
                flash.now[:danger] = "Too many login attempts. Try again in 15 minutes"
              end
            else
              flash[:warning] = "Account not activated. Check your email for the activation link"
              redirect_to root_url
            end 
          else
            user.logins.push( (Time.now.to_f*1000).to_i )
            user.save
            flash.now[:danger] = 'Invalid email/password combination. You have ' + [0,(10-user.logins.count)].max.to_s + ' further attempts in the next 15 minutes' 
            render 'new'  
          end
        else
          flash.now[:danger] = 'Invalid email/password combination'
          render 'new'  
        end
    end

    def pulse
        if @user then @user.poke end
        head :ok
    end

    def destroy
        if logged_in? then log_out end
        redirect_to root_url
    end

    def self.count_users
        online = User.where('updated_at > ?', DateTime.now - 15.minutes)
        @@users_online = online.count
    end

    def users_online
        render json:{count: @@users_online.to_s +  " user".pluralize(@@users_online) + " online"}
    end

    def check_login_count user
      user.logins.delete_if { |n| n < (Time.now.to_f*1000).to_i - 450000 }
      user.save
      user.logins.count < 10
    end


end
