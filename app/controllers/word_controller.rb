class WordController < ApplicationController
    before_action :logged_in_user , only: [:new, :create, :edit, :destroy]

    def create
        @wordset = WordSet.new
    end

    def index
        #Index by user
        #Or index by public
    end

    def new

    end

    def edit
        @wordset = WordSet.find(params[:id])
    end

    def update

    end

    def destroy
        puts params.to_s
        WordSet.find(params[:word_set]).destroy
        flash[:success] = "Test deleted"
        redirect_to :back
    end

    def get
        #Params-
        #set: This is only used if the user is asking for a default set
        #lang: language code, used in search and default sets
        #id: used to find custom sets

        @user = current_user
        #Check if the ID is valid
        #If the value is a non private text, return it
        #Otherwise check if the user is the owner
        #Default return value is the default word set?
        render json:{words:"words from rails"}
    end

end
