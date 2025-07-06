tiles = [
  # マンズ（萬子）
  { name: "一萬", suit: "man", number: "1", image_url: "/images/Man1.png" },
  { name: "二萬", suit: "man", number: "2", image_url: "/images/Man2.png" },
  { name: "三萬", suit: "man", number: "3", image_url: "/images/Man3.png" },
  { name: "四萬", suit: "man", number: "4", image_url: "/images/Man4.png" },
  { name: "五萬", suit: "man", number: "5", image_url: "/images/Man5.png" },
  { name: "赤五萬", suit: "man", number: "5", image_url: "/images/Man5-Dora.png" },
  { name: "六萬", suit: "man", number: "6", image_url: "/images/Man6.png" },
  { name: "七萬", suit: "man", number: "7", image_url: "/images/Man7.png" },
  { name: "八萬", suit: "man", number: "8", image_url: "/images/Man8.png" },
  { name: "九萬", suit: "man", number: "9", image_url: "/images/Man9.png" },
  # ピンズ（筒子）
  { name: "一筒", suit: "pin", number: "1", image_url: "/images/Pin1.png" },
  { name: "二筒", suit: "pin", number: "2", image_url: "/images/Pin2.png" },
  { name: "三筒", suit: "pin", number: "3", image_url: "/images/Pin3.png" },
  { name: "四筒", suit: "pin", number: "4", image_url: "/images/Pin4.png" },
  { name: "五筒", suit: "pin", number: "5", image_url: "/images/Pin5.png" },
  { name: "赤五筒", suit: "pin", number: "5", image_url: "/images/Pin5-Dora.png" },
  { name: "六筒", suit: "pin", number: "6", image_url: "/images/Pin6.png" },
  { name: "七筒", suit: "pin", number: "7", image_url: "/images/Pin7.png" },
  { name: "八筒", suit: "pin", number: "8", image_url: "/images/Pin8.png" },
  { name: "九筒", suit: "pin", number: "9", image_url: "/images/Pin9.png" },
  # ソウズ（索子）
  { name: "一索", suit: "sou", number: "1", image_url: "/images/Sou1.png" },
  { name: "二索", suit: "sou", number: "2", image_url: "/images/Sou2.png" },
  { name: "三索", suit: "sou", number: "3", image_url: "/images/Sou3.png" },
  { name: "四索", suit: "sou", number: "4", image_url: "/images/Sou4.png" },
  { name: "五索", suit: "sou", number: "5", image_url: "/images/Sou5.png" },
  { name: "赤五索", suit: "sou", number: "5", image_url: "/images/Sou5-Dora.png" },
  { name: "六索", suit: "sou", number: "6", image_url: "/images/Sou6.png" },
  { name: "七索", suit: "sou", number: "7", image_url: "/images/Sou7.png" },
  { name: "八索", suit: "sou", number: "8", image_url: "/images/Sou8.png" },
  { name: "九索", suit: "sou", number: "9", image_url: "/images/Sou9.png" },
  # 字牌
  { name: "白", suit: "honor", number: "haku", image_url: "/images/Haku.png" },
  { name: "發", suit: "honor", number: "hatsu", image_url: "/images/Hatsu.png" },
  { name: "中", suit: "honor", number: "chun", image_url: "/images/Chun.png" },
  { name: "東", suit: "honor", number: "east", image_url: "/images/Ton.png" },
  { name: "南", suit: "honor", number: "south", image_url: "/images/Nan.png" },
  { name: "西", suit: "honor", number: "west", image_url: "/images/Shaa.png" },
  { name: "北", suit: "honor", number: "north", image_url: "/images/Pei.png" },
]

tiles.each do |tile|
  Tile.find_or_create_by!(name: tile[:name]) do |t|
    t.suit = tile[:suit]
    t.number = tile[:number]
    t.image_url = tile[:image_url]
  end
end

Quiz.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('quizzes')
Category.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('categories')

Category.create!([
  {name: "牌効率"},
  {name: "押し引き"},
  {name:"リーチ判断"},
  {name: "仕掛け"},
  {name: "手役意識"}
])

牌効率_quiz_data = [
  {
    tiles: ["三萬","三萬","五萬","六萬","七萬","八萬","九萬","五筒","六筒","七筒","七筒","七筒","八筒","八筒"],
    correct: "九萬",
    dora: "白",
    situation: "南４局 ６巡目 西家 上がりトップ",
    explanation: "鳴いて進める九萬が正着"
  },
  {
    tiles: ["五萬","六萬","六萬","七萬","八萬","三筒","五筒","三索","四索","五索","六索","七索","八索","九萬"],
    correct: "九萬",
    dora: "五筒",
    situation: "東3局 7巡目 東家 30,000点",
    explanation: "最高打点を見て九萬切りが正解"
  }
]

押し引き_quiz_data = [
  {
    tiles: ["二萬","三萬","六萬","七萬","四筒","五筒","五筒","五筒","六筒","七筒","四索","四索","五索","四萬"],
    correct: "四筒",
    dora: "六索",
    situation: "東3局 7巡目 西家 28000点 トップ目32000点",
    explanation: "目一杯に受けよう"
  },
  {
    tiles: ["三萬","三萬","四萬","四萬","五萬","八萬","九萬","一筒","二筒","二筒","四索","四索","五索","三筒"],
    correct: "二筒",
    dora: "六索",
    situation: "東3局 7巡目 東家 30,000点",
    explanation: "もうこの辺テストだから適当"
  }
]

リーチ判断_quiz_data = [
  {
    tiles: ["三萬","三萬","五萬","六萬","七萬","八萬","九萬","五筒","六筒","七筒","七筒","七筒","八筒","八筒"],
    correct: "九萬",
    dora: "白",
    situation: "これはリーチ判断",
    explanation: "鳴いて進める九萬が正着"
  },
  {
    tiles: ["五萬","六萬","六萬","七萬","八萬","三筒","五筒","三索","四索","五索","六索","七索","八索","九萬"],
    correct: "九萬",
    dora: "五筒",
    situation: "これはリーチ判断２",
    explanation: "最高打点を見て九萬切りが正解"
  }
]

仕掛け_quiz_data = [
  {
    tiles: ["三萬","三萬","五萬","六萬","七萬","八萬","九萬","五筒","六筒","七筒","七筒","七筒","八筒","八筒"],
    correct: "九萬",
    dora: "白",
    situation: "仕掛け",
    explanation: "鳴いて進める九萬が正着"
  },
  {
    tiles: ["五萬","六萬","六萬","七萬","八萬","三筒","五筒","三索","四索","五索","六索","七索","八索","九萬"],
    correct: "九萬",
    dora: "五筒",
    situation: "仕掛け2",
    explanation: "最高打点を見て九萬切りが正解"
  }
]

手役意識_quiz_data = [
  {
    tiles: ["三萬","三萬","五萬","六萬","七萬","八萬","九萬","五筒","六筒","七筒","七筒","七筒","八筒","八筒"],
    correct: "九萬",
    dora: "白",
    situation: "手役意識",
    explanation: "鳴いて進める九萬が正着"
  },
  {
    tiles: ["五萬","六萬","六萬","七萬","八萬","三筒","五筒","三索","四索","五索","六索","七索","八索","九萬"],
    correct: "九萬",
    dora: "五筒",
    situation: "手役意識2",
    explanation: "最高打点を見て九萬切りが正解"
  }
]



def tile_id(name)
  Tile.find_by(name: name)&.id
end

def create_quizzes(quiz_data, category_id)
  quiz_data.each do |data|
    Quiz.create!(
      category_id: category_id,
      quiz_tile_ids: data[:tiles].map { |name| tile_id(name) },
      correct_tile_id: tile_id(data[:correct]),
      dora_indicator_tile_ids: [tile_id(data[:dora])],
      situation: data[:situation],
      explanation: data[:explanation]
    )
  end
end

create_quizzes(牌効率_quiz_data, 1)
create_quizzes(押し引き_quiz_data, 2)
create_quizzes(リーチ判断_quiz_data, 3)
create_quizzes(仕掛け_quiz_data, 4)
create_quizzes(手役意識_quiz_data, 5)
