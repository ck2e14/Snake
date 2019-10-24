class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        users = User.all
       render json: UserSerializer.new(users).to_serialized_json
    end

    def create
        
        user = User.create(user_params)
    
       render json: UserSerializer.new(user).to_serialized_json
    end 

    def show
        user = User.find_by(id: params[:id])
        if user 
            render json: user, except: [:created_at, :updated_at]    
        else
            render json: { Message: 'User not found' }
        end 
    end
    def edit
        user = User.find_by(id: params[:id])
    end

    def update
        
        
        user.update(user_params)

        if user 
            render json: user, except: [:created_at, :updated_at]    
        else
            render json: { Message: 'User not found' }
        end 

    end

    private 
    def user_params
        params.require(:user).permit(:name, :username, :email, [scores_attributes: :score_num])
    end

   
end 
