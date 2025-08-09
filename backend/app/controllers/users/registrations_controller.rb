class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { status: :ok, user: resource }
    else
      render json: { status: :error, errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
