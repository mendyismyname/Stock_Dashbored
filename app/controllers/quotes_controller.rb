class QuotesController < ApplicationController
	def show
		res = RestClient.get("http://finance.google.com/finance/historical?q=#{params[:ticker]}&startdate=#{params[:startdate]}&output=csv")
		res = res.force_encoding('UTF-8').lines[1..-1]
		prices = res.map do |price|
			price = price.chomp!.split(',')
			{
				date: price[0],
				open: price[1],
				high: price[2],
				low: price[3],
				close: price[4],
				volume: price[5]
			}

			
		end
		render json: prices
	end
end
