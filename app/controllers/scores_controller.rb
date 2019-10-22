class ScoresController < ApplicationController
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
end
