# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Quiz, type: :model do
  describe '#accept_tiles_expanded' do
    it 'returns empty array when accept_tiles is blank' do
      quiz = create(:quiz, accept_tiles: nil)

      expect(quiz.accept_tiles_expanded).to eq([])
    end

    it 'returns tiles with image URLs sorted by count descending' do
      tile_a = create(:tile, name: '一萬', image_url: '/images/Man1.png')
      tile_b = create(:tile, name: '二萬', image_url: '/images/Man2.png')
      quiz = create(:quiz, accept_tiles: { '一萬' => 2, '二萬' => 4 })

      result = quiz.accept_tiles_expanded

      expect(result.size).to eq(2)
      expect(result.first).to eq({ name: '二萬', count: 4, image_url: tile_b.image_url })
      expect(result.last).to eq({ name: '一萬', count: 2, image_url: tile_a.image_url })
    end
  end
end
