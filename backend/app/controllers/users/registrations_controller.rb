class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { status: :ok, user: resource }
    else
      render json: { status: :error, errors: ["登録できませんでした。入力内容をご確認ください"] }, status: :unprocessable_entity
    end
  end
end
