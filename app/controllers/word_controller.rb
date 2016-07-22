class WordController < ApplicationController

    def create
        @wordset = WordSet.find(params[:id])
    end

    def index
        #Index by user
        #Or index by public
    end

    def new

    end

    def create

    end

    def edit
        @wordset = WordSet.find(params[:id])
    end

    def update

    end

    def destroy
        WordSet.find(params[:id]).destroy

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
