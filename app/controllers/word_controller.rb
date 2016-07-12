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

end
