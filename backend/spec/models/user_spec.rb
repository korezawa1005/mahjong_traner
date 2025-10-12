# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.find_or_create_from_google' do
    let(:auth_hash) do
      OmniAuth::AuthHash.new(
        uid: 'google-uid-123',
        info: { email: 'google_user@example.com', name: 'Google User' }
      )
    end

    it 'creates a new user when email does not exist' do
      expect do
        described_class.find_or_create_from_google(auth_hash)
      end.to change(described_class, :count).by(1)

      user = described_class.last
      expect(user.email).to eq('google_user@example.com')
      expect(user.name).to eq('Google User')
      expect(user.encrypted_password).to be_present
    end

    it 'returns existing user and fills missing name' do
      existing = create(:user, email: 'google_user@example.com', name: nil)

      expect do
        result = described_class.find_or_create_from_google(auth_hash)
        expect(result.id).to eq(existing.id)
        expect(result.name).to eq('Google User')
      end.not_to change(described_class, :count)
    end
  end
end
