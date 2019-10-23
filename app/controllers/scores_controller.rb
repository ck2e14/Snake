class ScoresController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        scores = Score.all
        render json: scores, except: [:created_at, :updated_at]
    end

    def show
        score = Score.find_by(id: params[:id])
        if score 
            render json: {id: score.id, user: score.user}, except: [:created_at, :updated_at]
        else
            render json: { Message: 'Score not found' }
        end
    end

    def create
        score = Score.create(score_params)
        render json: score, except: [:created_at, :updated_at]
    end

    def update

        score = score.find_by(id: params[:id])
        score.update(score_params)
        
    end

private 

def score_params
    params.require(:score).permit!
end
    
end
