# frozen_string_literal: true

FactoryBot.define do
  factory :tile do
    sequence(:name) { |n| "牌#{n}" }
    suit { 'man' }
    number { '1' }
    sequence(:image_url) { |n| "/images/tile#{n}.png" }
  end
end
