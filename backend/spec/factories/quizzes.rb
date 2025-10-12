# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    category
    association :correct_tile, factory: :tile
    situation { "東1局 南家 5巡目" }
    explanation { "テスト用の解説" }
    table_state { "供託0 / 本場0" }
    accept_tiles { {} }
    decision_options { [] }
    correct_decision { nil }
    call_options { [] }
    correct_calls { [] }

    transient do
      extra_tiles_count { 0 }
    end

    after(:build) do |quiz, evaluator|
      ids = Array(quiz.quiz_tile_ids)
      ids << quiz.correct_tile.id unless ids.include?(quiz.correct_tile.id)

      if evaluator.extra_tiles_count.positive?
        ids.concat(create_list(:tile, evaluator.extra_tiles_count).map(&:id))
      end

      quiz.quiz_tile_ids = ids
      quiz.dora_indicator_tile_ids ||= []
    end
  end
end
