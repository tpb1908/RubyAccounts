class WordController < ApplicationController
    before_action :logged_in_user , only: [:new, :create, :edit, :destroy]

    def create
        if current_user
            current_user.word_sets.create( {name: params[:name], words: params[:words], public: params[:public]} )
            flash[:success] = "Test created"
            redirect_to current_user
        else
            flash[:error] = "There was a problem saving the test"
        end    
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

    def show

    end

    #Support for random text (crypto), text (lorem) name (name), numbers(number) time(time)
    #TODO- Make sure this can't be abused
    def generate
    
        length = 500
        if params[:length]
            length = params[:length].to_f
            if length > 10000 then length = 10000 end
            if length < 10 then length = 10 end
        end
        type = params[:type] ? params[:type] : 'L'
        words = ''
        case type
        when 'Lat'
            #35 is the shortest value for sentences which consistently gives at least the correct character count
            words = Faker::Lorem.sentences(length/35).join(' ')
        when 'Ran'
            while words.length < length do
                words += Faker::Internet.password(5, 20).to_s + " "
            end
        when 'Nam'
            while words.length < length  do
                words += Faker::Name.name + " "
            end
        when 'Num'
            while words.length < length do
                words += (rand(10 ** rand(1..15))).to_s + " "
                puts 'Length ' + words.length.to_s
            end
        when 'Dat'
            while words.length < length do
                words += Faker::Date.between(10.years.ago, 10.years.from_now).to_s + " "
            end
        else 
            render json:{text: "Invalid type"}
        end    
        render json:{text: words[0..length-1]} 
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
