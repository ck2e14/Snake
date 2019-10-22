class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        users = User.all
        render json: users, except: [:created_at, :updated_at]
    end

    def create
        user = User.create(user_params)
        # if user.valid? 
        #     user.save
        # else 
        #     render :index
        # end
        
    end 

    def show
        user = User.find_by(id: params[:id])
        if user 
            render json: user, except: [:created_at, :updated_at]    
        else
            render json: { Message: 'User not found' }
        end
    end

    private 
    def user_params
        params.require(:user).permit!
    end
end
