class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy]
  before_action :correct_user, only: [:edit, :update]
  before_action :admin_user, only: [:destroy, :toggle_admin]


  def show
  	@user = User.find(params[:id])
    redirect_to root_url and return unless @user.activated?
  end

  def index
    if(params[:search])
      @users = User.search(params[:search]).where(activated: true)
      if @users.length == 0
        flash.now[:danger] = "No users found"
      else 
        flash.now[:success] = @users.length.to_s + " user".pluralize(@users.length) + " found"
      end
    else
      @users = User.where(activated: true).paginate(page: params[:page])
    end
    if params[:timerange]
        @users = @users.where("created_at > ", params[:timerange])
        @users = @users.order("date ASC", "created_at ASC")
    end
    @users = @users.paginate(page: params[:page])

  end

  def new
  	@user = User.new
  end

  def create
  	@user = User.new(user_params)
  	if @user.save
      @user.send_activation_email
      flash[:info] = "Please check your email to activate your account"
      redirect_to root_url
  	else
  		render 'new'
  	end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    puts 'Updating user ' + user_params.to_s
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    puts params
    User.find(params[:user]).destroy
    flash[:success] = "Account deleted"
    redirect_to users_url
  end

  private

  	def user_params
  		params.require(:user).permit(:name, :email, :password, :password_confirmation, :username)
  	end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end

    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
