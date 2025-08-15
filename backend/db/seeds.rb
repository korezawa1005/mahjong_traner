puts '== SEED FILE RUNNING =='
tiles = [
  # マンズ（萬子）
  { name: '一萬', suit: 'man', number: '1', image_url: '/images/Man1.png' },
  { name: '二萬', suit: 'man', number: '2', image_url: '/images/Man2.png' },
  { name: '三萬', suit: 'man', number: '3', image_url: '/images/Man3.png' },
  { name: '四萬', suit: 'man', number: '4', image_url: '/images/Man4.png' },
  { name: '五萬', suit: 'man', number: '5', image_url: '/images/Man5.png' },
  { name: '赤五萬', suit: 'man', number: '5', image_url: '/images/Man5-Dora.png' },
  { name: '六萬', suit: 'man', number: '6', image_url: '/images/Man6.png' },
  { name: '七萬', suit: 'man', number: '7', image_url: '/images/Man7.png' },
  { name: '八萬', suit: 'man', number: '8', image_url: '/images/Man8.png' },
  { name: '九萬', suit: 'man', number: '9', image_url: '/images/Man9.png' },
  # ピンズ（筒子）
  { name: '一筒', suit: 'pin', number: '1', image_url: '/images/Pin1.png' },
  { name: '二筒', suit: 'pin', number: '2', image_url: '/images/Pin2.png' },
  { name: '三筒', suit: 'pin', number: '3', image_url: '/images/Pin3.png' },
  { name: '四筒', suit: 'pin', number: '4', image_url: '/images/Pin4.png' },
  { name: '五筒', suit: 'pin', number: '5', image_url: '/images/Pin5.png' },
  { name: '赤五筒', suit: 'pin', number: '5', image_url: '/images/Pin5-Dora.png' },
  { name: '六筒', suit: 'pin', number: '6', image_url: '/images/Pin6.png' },
  { name: '七筒', suit: 'pin', number: '7', image_url: '/images/Pin7.png' },
  { name: '八筒', suit: 'pin', number: '8', image_url: '/images/Pin8.png' },
  { name: '九筒', suit: 'pin', number: '9', image_url: '/images/Pin9.png' },
  # ソウズ（索子）
  { name: '一索', suit: 'sou', number: '1', image_url: '/images/Sou1.png' },
  { name: '二索', suit: 'sou', number: '2', image_url: '/images/Sou2.png' },
  { name: '三索', suit: 'sou', number: '3', image_url: '/images/Sou3.png' },
  { name: '四索', suit: 'sou', number: '4', image_url: '/images/Sou4.png' },
  { name: '五索', suit: 'sou', number: '5', image_url: '/images/Sou5.png' },
  { name: '赤五索', suit: 'sou', number: '5', image_url: '/images/Sou5-Dora.png' },
  { name: '六索', suit: 'sou', number: '6', image_url: '/images/Sou6.png' },
  { name: '七索', suit: 'sou', number: '7', image_url: '/images/Sou7.png' },
  { name: '八索', suit: 'sou', number: '8', image_url: '/images/Sou8.png' },
  { name: '九索', suit: 'sou', number: '9', image_url: '/images/Sou9.png' },
  # 字牌
  { name: '白', suit: 'honor', number: 'haku', image_url: '/images/Haku.png' },
  { name: '發', suit: 'honor', number: 'hatsu', image_url: '/images/Hatsu.png' },
  { name: '中', suit: 'honor', number: 'chun', image_url: '/images/Chun.png' },
  { name: '東', suit: 'honor', number: 'east', image_url: '/images/Ton.png' },
  { name: '南', suit: 'honor', number: 'south', image_url: '/images/Nan.png' },
  { name: '西', suit: 'honor', number: 'west', image_url: '/images/Shaa.png' },
  { name: '北', suit: 'honor', number: 'north', image_url: '/images/Pei.png' }
]

tiles.each do |tile|
  Tile.find_or_create_by!(name: tile[:name]) do |t|
    t.suit = tile[:suit]
    t.number = tile[:number]
    t.image_url = tile[:image_url]
  end
end

Comment.delete_all
QuizAnswer.delete_all
QuizSession.delete_all
Quiz.delete_all
Category.delete_all

ActiveRecord::Base.connection.reset_pk_sequence!('comments')
ActiveRecord::Base.connection.reset_pk_sequence!('quiz_answers')
ActiveRecord::Base.connection.reset_pk_sequence!('quiz_sessions')
ActiveRecord::Base.connection.reset_pk_sequence!('quizzes')
ActiveRecord::Base.connection.reset_pk_sequence!('categories')

categories = [
  { name: '牌効率' },
  { name: '押し引き' },
  { name: 'リーチ判断' },
  { name: '仕掛け' },
  { name: '手役意識' }
]

categories.each do |category_attrs|
  Category.find_or_create_by!(category_attrs)
end

def category_id_by_name(name)
  Category.find_by!(name: name).id
end

牌効率_quiz_data = [
  {
    tiles: %w[三萬 四萬 五萬 六萬 七萬 二筒 三筒 八筒 八筒 五索 七索 七索 九索 一筒],
    correct: '七索',
    dora: '二筒',
    situation: '東1局 西家 8巡目',
    explanation: 'ソーズはどれを切っても受け入れ枚数は変わらない。ピンフをつけれるようにリャン間に構える。',
    accept_tiles: {
    "五筒" => 24,
    "三索" => 22,
    "一萬" => 16,
    "九筒" => 8
    }
  },
  # {
  #   tiles: %w[三萬 四萬 五萬 六萬 七萬 二筒 三筒 八筒 八筒 五索 七索 七索 九索 四筒],
  #   correct: '九索',
  #   dora: '二筒',
  #   situation: '東1局 西家 8巡目',
  #   explanation: 'タンヤオを確定させましょう。打点面で有利かつ、かわし手にとすることもできる'
  # },
  
  # {
  #   tiles: %w[六萬 七萬 八萬 八萬 八萬 九萬 四筒 五筒 赤五筒 七筒 九筒 三索 三索 八筒],
  #   correct: '五筒',
  #   dora: '九索',
  #   situation: '東1局 東家 6巡目',
  #   explanation: 'リャンメン固定で平和になりやすい形にする。マンズは五七八萬の3種が有効牌のため大事にしよう'
  # },
  # {
  #   tiles: %w[三萬 三萬 二筒 二筒 三筒 六筒 七筒 七筒 八筒 八筒 八筒 四索 五索 六索],
  #   correct: '二筒',
  #   dora: '一萬',
  #   situation: '東1局 西家 6巡目',
  #   explanation: '二筒と八筒の選択。打八筒の方が一盃口になりやすいが、打二筒の方が単純に広い。打二筒と打八筒で5枚差があるためここは広さをとって打二筒としたい。'
  # },
  # {
  #   tiles: %w[六萬 七萬 三筒 四筒 五筒 五筒 六筒 七筒 七筒 七筒 三索 三索 四索 六筒],
  #   correct: '四索',
  #   dora: '六萬',
  #   situation: '東1局 東家 7巡目',
  #   explanation: '567筒のメンツを抜き出すと、3面受けに七筒がくっついた形。ソーズヘッド固定の打四索が受け入れ、打点面ともに優秀'
  # },
  # {
  #   tiles: %w[六萬 七萬 二筒 三筒 四筒 五筒 五筒 六筒 七筒 七筒 七筒 三索 三索 四索],
  #   correct: '五筒',
  #   dora: '六萬',
  #   situation: '東1局 東家 7巡目',
  #   explanation: 'ヘッド候補が2つあるかどうかで受け入れ枚数が大きく変わる形。2ヘッドに構える打五筒、四索の2択になる。受け入れ枚数的に3枚差で打五筒の方が多い。また、打点が必要な局面の場合は打二筒の方が手役意識的には良い。'
  # },
  # {
  #   tiles: %w[二萬 二萬 三萬 赤五萬 六萬 七萬 五筒 五筒 七筒 二索 三索 四索 五索 六索],
  #   correct: '七筒',
  #   dora: '西',
  #   situation: '東1局 東家 4巡目',
  #   explanation: '567の三色が見えるが、ここは素直に完全1シャンテンに受ける。三色狙いの打三萬は七索を引いたとしても、最終系がカンチャン待ちとなり苦しいため打七筒としたい。'
  # },
  # {
  #   tiles: %w[二筒 二筒 三筒 赤五萬 五筒 五筒 六筒 七筒 七筒 二索  三索 四索 五索 六索],
  #   correct: '七筒',
  #   dora: '西',
  #   situation: '東1局 東家 4巡目',
  #   explanation: '複雑そうに見えるが、567筒の完成メンツを抜き出せば受け入れ枚数が少ない牌が七筒だとわかる'
  # },
  # {
  #   tiles: %w[六萬 六萬 一筒 二筒 三筒 三筒 三筒 四筒 三索 三索 四索 中 中 中],
  #   correct: '三筒',
  #   dora: '發',
  #   situation: '東1局 東家 7巡目',
  #   explanation: '3ヘッドなので打3筒か打4索でのリャンメン固定が良い。ピンズは必要牌を自分で一枚使っているのでソーズを残したい。ポンテンは4倍速と言われており、たった1枚差だがバカにできない1枚差だ'
  # },
  # {
  #   tiles: %w[六萬 六萬 二筒 三筒 三筒 三筒 四筒 五筒 二索 二索 三索 中 中 中],
  #   correct: '二索',
  #   dora: '發',
  #   situation: '東1局 東家 7巡目',
  #   explanation: '打2索が最大受け入れ。シンプルに受けよう。'
  # },
  # {
  #   tiles: %w[一筒 三筒 三筒 三筒 四筒 五筒 六筒 七筒 八筒 二索 二索 五萬 五萬 六萬],
  #   correct: '五萬',
  #   dora: '七筒',
  #   situation: '東1局 東家 7巡目',
  #   explanation: '喰いタン狙いで打一筒としない。3ヘッドなので、2ヘッドに構える。打五萬が2枚差で受け入れ最大になる。556m133p22s+345678pと完成メンツを抜くと3ヘッドであることがわかる。'
  # },
]

押し引き_quiz_data = [
  {
    tiles: %w[三萬 四萬 五萬 六萬 七萬 二筒 三筒 八筒 八筒 五索 七索 七索 九索 七索],
    correct: '五索',
    dora: '二筒',
    situation: '東1局 西家 8巡目',
    explanation: '浮いている五索と九索の比較。五索を残せば、赤五索や六索引きでのピンフ追加もあるが、マンズ3面待ち、ピンズはドラ含みのいい形のため今回は危険度重視で五索から切るようにしたい'
  },
]

リーチ判断_quiz_data = [
  
]

仕掛け_quiz_data = [
  
]

手役意識_quiz_data = [
  {
    tiles: %w[六萬 七萬 八萬 八萬 八萬 九萬 四筒 五筒 赤五筒 七筒 九筒 東 東 八筒],
    correct: '九萬',
    dora: '九索',
    situation: '東1局 東家 6巡目',
    explanation: 'ダブ東の2ハンは大きいので最終的に東待ちにできるように構える。打五筒と比べてわずか1枚損。'
  },
]

def tile_id(name)
  Tile.find_by(name: name)&.id
end

def create_quizzes(quiz_data, category_id)
  created = 0
  quiz_data.each_with_index do |data, i|
    # ---- 1. スペースや余分な空白チェック ----
    all_fields = data[:tiles] + [data[:correct], data[:dora]]
    all_fields.each do |name|
      if name != name.strip
        raise "Quiz #{i+1}: '#{name}' has leading/trailing spaces"
      end
      if name.match?(/\s/)
        raise "Quiz #{i+1}: '#{name}' contains space characters"
      end
      created += 1
    end
    puts "category_id=#{category_id}: created #{created} quizzes"

    # ---- 2. 枚数チェック ----
    raise "Quiz #{i+1}: tiles must be 14" unless data[:tiles].size == 14

    # ---- 3. 正解牌がtilesに含まれているか ----
    unless data[:tiles].include?(data[:correct])
      raise "Quiz #{i+1}: correct '#{data[:correct]}' not in tiles"
    end

    Quiz.create!(
      category_id: category_id,
      quiz_tile_ids: data[:tiles].map { |name| tile_id(name) },
      correct_tile_id: tile_id(data[:correct]),
      dora_indicator_tile_ids: [tile_id(data[:dora])],
      situation: data[:situation],
      explanation: data[:explanation],
      accept_tiles: data[:accept_tiles] || {}
    )
  end
end

create_quizzes(牌効率_quiz_data,   category_id_by_name('牌効率'))
create_quizzes(押し引き_quiz_data, category_id_by_name('押し引き'))
create_quizzes(リーチ判断_quiz_data, category_id_by_name('リーチ判断'))
create_quizzes(仕掛け_quiz_data,   category_id_by_name('仕掛け'))
create_quizzes(手役意識_quiz_data,  category_id_by_name('手役意識'))

puts '== Seeding default reviewer =='

reviewer = User.find_or_initialize_by(email: ENV.fetch('REVIEWER_EMAIL', 'reviewer@example.com'))

reviewer.assign_attributes(
  password: ENV.fetch('REVIEWER_PASSWORD', 'Password123'),
  password_confirmation: ENV.fetch('REVIEWER_PASSWORD', 'Password123'),
  role: 'reviewer'
)

if reviewer.save
  puts "✔️  Reviewer created: #{reviewer.email}"
else
  puts "⚠️  Reviewer not saved: #{reviewer.errors.full_messages.join(', ')}"
end
