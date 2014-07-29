class StocksController < ApplicationController
  def index
    @stocks = Stock.where('name LIKE ? OR ticker LIKE ?', "%#{params[:query]}%", "%#{params[:query]}%")
    respond_to do |format|
      format.json { render json: @stocks }
    end
  end

  def show
    @stock = Stock.find(params[:id])
    respond_to do |format|
      format.json { render json: @stock }
    end
  end

  def create
    @stock = Stock.find(params[:id])
    current_user.stocks << @stock
    respond_to do |format|
      format.json { render json: @stock }
    end
  end

  private 

  def stock_params
     params.require(:stock).permit(:query, :id)
  end
end