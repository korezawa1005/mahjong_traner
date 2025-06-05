class Api::V1::ChartsController < ApplicationController #API
  def show
    render json: {
      labels: ["牌効率", "押し引き", "リーチ判断", "状況判断", "手組み"],
      data: [70, 60, 80, 75, 90]
    }
  end
end