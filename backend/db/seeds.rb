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
  { name: '手役意識' },
  { name: '押し引き' },
  { name: 'リーチ判断' },
  { name: '仕掛け' }
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
    "五索" => 19,
    "七索" => 19,
    "九索" => 19
    }
  },
  {
    tiles: %w[三萬 四萬 五萬 六萬 七萬 二筒 三筒 八筒 八筒 五索 七索 七索 九索 四筒],
    correct: '九索',
    dora: '二筒',
    situation: '東1局 西家 8巡目',
    explanation: 'タンヤオを確定させましょう。打点面で有利かつ、かわし手にとすることもできる',
    accept_tiles: {
    "五索" => 19,
    "七索" => 19,
    "九索" => 19
    }
  },
  
  {
    tiles: %w[六萬 七萬 八萬 八萬 八萬 九萬 四筒 五筒 赤五筒 七筒 九筒 三索 三索 八筒],
    correct: '五筒',
    dora: '九索',
    situation: '東1局 東家 6巡目',
    explanation: 'リャンメン固定で平和になりやすい形にする。マンズは五七八萬の3種が有効牌のため大事にしよう',
    accept_tiles: {
    "五筒" => 18,
    "九萬" => 17,
    "八萬" => 15,
    "六萬" => 13
    }
  },
  {
    tiles: %w[三萬 三萬 二筒 二筒 三筒 六筒 七筒 七筒 八筒 八筒 八筒 四索 五索 六索],
    correct: '二筒',
    dora: '一萬',
    situation: '東1局 西家 6巡目',
    explanation: '二筒と八筒の選択。打八筒の方が一盃口になりやすいが、打二筒の方が単純に広い。打二筒と打八筒で5枚差があるためここは広さをとって打二筒としたい。',
    accept_tiles: {
    "二筒" => 24,
    "八筒" => 19,
    "三筒" => 18,
    "七筒" => 17
    }
  },
  {
    tiles: %w[六萬 七萬 三筒 四筒 五筒 五筒 六筒 七筒 七筒 七筒 三索 三索 四索 六筒],
    correct: '四索',
    dora: '六萬',
    situation: '東1局 東家 7巡目',
    explanation: '567筒のメンツを抜き出すと、3面受けに七筒がくっついた形。ソーズヘッド固定の打四索が受け入れ、打点面ともに優秀',
    accept_tiles: {
    "四索" => 26,
    "三筒" => 22,
    "六筒" => 22,
    "五筒" => 20,
    "七筒" => 18,
    "三索" => 16
  }
  },
  {
    tiles: %w[六萬 七萬 二筒 三筒 四筒 五筒 五筒 六筒 七筒 七筒 七筒 三索 三索 四索],
    correct: '五筒',
    dora: '六萬',
    situation: '東1局 東家 7巡目',
    explanation: 'ヘッド候補が2つあるかどうかで受け入れ枚数が大きく変わる形。2ヘッドに構える打五筒、四索の2択になる。受け入れ枚数的に3枚差で打五筒の方が多い。また、打点が必要な局面の場合は打二筒の方が手役意識的には良い。',
    accept_tiles: {
    "五筒" => 26,
    "四索" => 23,
    "二筒" => 22,
    "六筒" => 20,
    "三索" => 16,
    "七筒" => 11
    }
  },
  {
    tiles: %w[二萬 二萬 三萬 赤五萬 六萬 七萬 五筒 五筒 七筒 二索 三索 四索 五索 六索],
    correct: '七筒',
    dora: '西',
    situation: '東1局 東家 4巡目',
    explanation: '567の三色が見えるが、ここは素直に完全1シャンテンに受ける。三色狙いの打三萬は七索を引いたとしても、最終系がカンチャン待ちとなり苦しいため打七筒としたい。',
    accept_tiles: {
    "七筒" => 23,
    "二萬" => 19,
    "三萬" => 19,
    "五筒" => 15
    }
  },
  {
    tiles: %w[二筒 二筒 三筒 赤五筒 五筒 五筒 六筒 七筒 七筒 二索  三索 四索 五索 六索],
    correct: '七筒',
    dora: '西',
    situation: '東1局 東家 4巡目',
    explanation: '複雑そうに見えるが、567筒の完成メンツを抜き出せば受け入れ枚数が少ない牌が七筒だとわかる',
    accept_tiles: {
    "七筒" => 26,
    "三筒" => 23,
    "六筒" => 23,
    "二筒" => 19,
    "五筒" => 18
    }
  },
  {
    tiles: %w[六萬 六萬 一筒 二筒 三筒 三筒 三筒 四筒 三索 三索 四索 中 中 中],
    correct: '三筒',
    dora: '發',
    situation: '東1局 東家 7巡目',
    explanation: '3ヘッドなので打3筒か打4索でのリャンメン固定が良い。ピンズは必要牌を自分で一枚使っているのでソーズを残したい。ポンテンは4倍速と言われており、たった1枚差だがバカにできない1枚差だ',
    accept_tiles: {
    "三筒" => 19,
    "三索" => 18,
    "一筒" => 13,
    "四筒" => 13,
    "四索" => 12
    }
  },
  {
    tiles: %w[六萬 六萬 二筒 三筒 三筒 三筒 四筒 五筒 二索 二索 三索 中 中 中],
    correct: '二索',
    dora: '發',
    situation: '東1局 東家 7巡目',
    explanation: '打2索が最大受け入れ。シンプルに受けよう。',
    accept_tiles: {
    "二索" => 22,
    "三筒" => 19,
    "二筒" => 17,
    "三索" => 16,
    "五筒" => 13
    }
  },
  {
    tiles: %w[一筒 三筒 三筒 三筒 四筒 五筒 六筒 七筒 八筒 二索 二索 五萬 五萬 六萬],
    correct: '五萬',
    dora: '七筒',
    situation: '東1局 東家 7巡目',
    explanation: '喰いタン狙いで打一筒としない。3ヘッドなので、2ヘッドに構える。打五萬が2枚差で受け入れ最大になる。556m133p22s+345678pと完成メンツを抜くと3ヘッドであることがわかる。',
    accept_tiles: {
    "五萬" => 22,
    "一筒" => 20,
    "六萬" => 16,
    "三筒" => 16
    }
  },
  {
    tiles: %w[一萬 一萬 二萬 二筒 二筒 三筒 六筒 七筒 七筒 八筒 八筒 八筒 赤五索 六索],
    correct: '二萬',
    dora: '一筒',
    situation: '東1局 西家 6巡目',
    explanation: 'ドラ3の2シャンテン。1シャンテン時に2ヘッドに構えられるように3ヘッドを維持する。喰いタンに移行しやすいメリットもあり。打8筒も打点面や対人要素（8筒先切りで9筒が出やすい）を考えれば悪くないが、牌効率的に677888pのような複合形はギリギリまで手をかけない方がいい。',
    accept_tiles: {
    "二萬" => 43,
    "八筒" => 43,
    "三筒" => 39,
    "六筒" => 38,
    "一萬" => 36,
    "二筒" => 36
    }
  },
  {
    tiles: %w[一萬 一萬 二萬 二筒 二筒 三筒 六筒 七筒 七筒 八筒 八筒 八筒 赤五索 六索],
    correct: '二萬',
    dora: '一筒',
    situation: '東1局 西家 6巡目',
    explanation: 'ドラ3の2シャンテン。1シャンテン時に2ヘッドに構えられるように3ヘッドを維持する。喰いタンに移行しやすいメリットもあり。打8筒も打点面や対人要素（8筒先切りで9筒が出やすい）を考えれば悪くないが、牌効率的に677888pのような複合形はギリギリまで手をかけない方がいい。',
    accept_tiles: {
    "二萬" => 43,
    "八筒" => 43,
    "三筒" => 39,
    "六筒" => 38,
    "一萬" => 36,
    "二筒" => 36
    }
  },
  {
    tiles: %w[七萬 七萬 八萬 二筒 二筒 二筒 三筒 四筒 四筒 二索 三索 赤五索 六索 七索],
    correct: '四筒',
    dora: '九索',
    situation: '東1局 東家 5巡目',
    explanation: '打八萬なら一盃口目が残るが、最終系を考えると三筒先引きが条件になるし。打点は確保されているので打四筒で受け入れ枚数最大に構えよう。最終系もリャンメン待ちになる。',
    accept_tiles: {
    "四筒" => 23,
    "八萬" => 20,
    "三筒" => 20,
    "七萬" => 16
    }
  },
  {
    tiles: %w[七萬 七萬 八萬 二筒 二筒 二筒 三筒 四筒 四筒 三索 三索 赤五索 六索 七索],
    correct: '七萬',
    dora: '九索',
    situation: '東1局 東家 5巡目',
    explanation: '受け入れ枚数最大に構える打七萬が正解。2分の1の確率でタンヤオが崩れるが、最高形はメンタンピン一盃口赤で打点十分。打四筒や打八萬は出るもの全てを仕掛ける上がりトップ条件などの打ち方で、東1局、序盤の打破位ではない。現代麻雀の基本は『好形メンゼン手を作ってリーチ』である。',
    accept_tiles: {
    "七萬" => 20,
    "四筒" => 17,
    "二筒" => 15,
    "八萬" => 14
    }
  },
  {
    tiles: %w[五萬 六萬 七萬 八萬 三筒 四筒 五筒 六筒 七索 八索 八索 九索 九索 九索],
    correct: '八索',
    dora: '西',
    situation: '東1局 東家 7巡目',
    explanation: '受け入れ最大で平和になりやすい。一盃口の目はなくなるが、最終形がペン七索では心許ない。そもそも七索は残り枚数が少ないので一盃口は完成しづらく、完成したとしても平和がなくなる。どうしても打点が必要な局面以外は橋寄りの一盃口は狙わない。',
    accept_tiles: {
    "八索" => 57,
    "七索" => 54,
    "五萬" => 42,
    "八萬" => 42,
    "三筒" => 38,
    "九索" => 15
    }
  },
  {
    tiles: %w[六萬 七萬 八萬 二筒 三筒 四筒 四筒 二索 三索 三索 五索 六索 七索 八索],
    correct: '二索',
    dora: '西',
    situation: '東1局 西家 7巡目',
    explanation: '三索ヘッド固定が受け入れ・期待値共に最大。最高形は三筒ひきのタンピン一盃口。見方によってはよっては二索と五索を浮き牌と見ることもできる。この二牌は筋になってるので両方残す意味は薄い。',
    accept_tiles: {
    "二索" => 42,
    "八索" => 33,
    "四筒" => 29,
    "三索" => 23,
    "三筒" => 8
    }
  },
  {
    tiles: %w[七萬 八萬 九萬 一筒 一筒 二筒 三筒 二索 三索 五索 六索 七索 七索 八索],
    correct: '一筒',
    dora: '西',
    situation: '東1局 西家 7巡目',
    explanation: '二索を切れば469s受けのリャンメンカンチャンだが、単独ヘッドのない今回の形では打一筒が受け入れ最大になる。最大でも六枚しか待ちがない亜リャンメンより純粋なリャンメン待ちを作ろう。',
    accept_tiles: {
    "二索" => 42,
    "八索" => 33,
    "四筒" => 29,
    "三索" => 23,
    "三筒" => 8
    }
  },
  {
    tiles: %w[五萬 六萬 七萬 八萬 二筒 二筒 四筒 五筒 六筒 七筒 七索 七索 七索 八索],
    correct: '八索',
    dora: '西',
    situation: '東1局 東家 5巡目',
    explanation: 'アンコそばはメンツが作りづらいので2つの4連形を活かし、多面待ちを狙おう。タンヤオが崩れやすく、三色にもならない八索入らない',
    accept_tiles: {
    "八索" => 50,
    "五萬" => 38,
    "八萬" => 38,
    "四筒" => 38,
    "七筒" => 38,
    "二筒" => 21
    }
  },
  {
    tiles: %w[七萬 七萬 九萬 九萬 二筒 三筒 四筒 赤五筒 六筒 二索 三索 四索 中 中],
    correct: '七萬',
    dora: '一萬',
    situation: '東1局 東家 8巡目',
    explanation: '7799mから1枚切り、3枚構成にする。最終形が中とのシャボ待ちになった時に上がりやすいように端寄りの牌を対子で残す。',
    accept_tiles: {
    "七萬" => 19,
    "九萬" => 19,
    "中" => 15
    }
  },
  {
    tiles: %w[七萬 七萬 九萬 九萬 二筒 三筒 四筒 赤五筒 六筒 二索 三索 四索 七索 七索],
    correct: '九萬',
    dora: '一萬',
    situation: '東1局 東家 8巡目',
    explanation: 'メンタンピン狙い。一筒でタンヤオは崩れるが、うちに寄せて完全1シャンテンを目指すのが基本。',
    accept_tiles: {
    "七萬" => 19,
    "九萬" => 19,
    "七索" => 15
    }
  },
  {
    tiles: %w[七萬 七萬 九萬 九萬 二筒 三筒 四筒 赤五筒 六筒 六筒 二索 三索 四索 七索],
    correct: '七索',
    dora: '一萬',
    situation: '東1局 東家 8巡目',
    explanation: '序盤ならシャンテン戻してでも打九萬でタンヤオに向かう手もあるが、8巡目の親ならツモ八萬での萬での最速聴牌を逃さないように構える。リーチすれば一盃口と赤で7700点になるので、残りの3枚のカンチャン待ちでも即リーチが基本。ツモ六萬での完全1シャンテン変化もある。3面待ち固定の打六筒は柔軟だが、7700点以上の打点を作ろうと思うとかなり時間がかかる。',
    accept_tiles: {
    "七索" => 21,
    "六筒" => 15,
    "二筒" => 10
    }
  },
  {
    tiles: %w[三筒 四筒 五筒 六筒 六筒 八筒 八筒 二索 二索 三萬 四萬 赤五萬 六萬 七萬],
    correct: '六筒',
    dora: '九萬',
    situation: '東1局 東家 7巡目',
    explanation: 'マンズのウケが広いので、完全1シャンテンに変化するより、即リーチになる確率の方が高い。ここはマンズ引きで聴牌した場合の最終形重視で打牌選択したい',
    accept_tiles: {
    "三筒" => 19,
    "六筒" => 19,
    "八筒" => 19,
    "二索" => 15
    }
  },
  {
    tiles: %w[三萬 四萬 四萬 五萬 二筒 三筒 三筒 五筒 二索 三索 四索 八索 八索 八索],
    correct: '二筒',
    dora: '七索',
    situation: '東1局 西家 8巡目',
    explanation: '中ぶくれはヘッド固定と相性がいい。打五筒としても最終形が14pになる可能性は低い。それならばツモ六筒でのリャンメン聴牌を逃さないように構えたい。',
    accept_tiles: {
    "二筒" => 33,
    "五筒" => 29,
    "四萬" => 24
    }
  },
  {
    tiles: %w[四萬 赤五萬 六萬 二筒 三筒 三筒 二索 二索 三索 三索 三索 四索 赤五索 五索],
    correct: '五索',
    dora: '三萬',
    situation: '東1局 東家 7巡目',
    explanation: '打三筒と打五索の受け入れ枚数は同じ。面前期待値では打三筒が上だが、赤五索引きでマンガンが確定したので、鳴き効率重視で打牌選択使用。三筒二索三索はポン、四筒六索はチー。三索はチーではなくポンすること。三索を3枚見せることで二索が出やすくなる。',
    accept_tiles: {
    "三筒" => 24,
    "五索" => 24,
    "三索" => 21,
    "二索" => 20,
    "二筒" => 18
    }
  },
  {
    tiles: %w[三筒 四筒 赤五筒 五筒 五筒 七筒 二索 二索 四索 四索 四索 五索 六索 六索],
    correct: '七筒',
    dora: '六筒',
    situation: '東1局 東家 6巡目',
    explanation: 'ドラ七筒を残しても六筒引き以外の聴牌は結局ドラ切りになる。ドラ表示牌の六筒と一盃口になる五索を引く確率は同じ。ドラの縦引きは魅力的だが、六索がアンコになっての聴牌の方が良い。',
    accept_tiles: {
    "七筒" => 21,
    "六索" => 20,
    "五筒" => 16,
    "四索" => 14,
    "五索" => 13
    }
  },
  {
    tiles: %w[五萬 五萬 六萬 七萬 二筒 二筒 三筒 三筒 四筒 五索 六索 六索 七索 七索],
    correct: '五萬',
    dora: '一萬',
    situation: '東1局 西家 7巡目',
    explanation: '五萬ヘッド固定ならタンピン二盃口まで狙える形になったが、打五萬とは有効枚数が違いすぎる。特にこの形はツモ一筒で台無しになってしまうので、素直に受け入れ枚数最大に受けるのが正解。',
    accept_tiles: {
    "五萬" => 30,
    "三筒" => 19,
    "六索" => 19,
    "六萬" => 17,
    "七萬" => 17
    }
  },
  {
    tiles: %w[赤五萬 六萬 六萬 七萬 二筒 三筒 四筒 六筒 六筒 七筒 四索 五索 六索 六索],
    correct: '七筒',
    dora: '三索',
    situation: '東1局 西家 7巡目',
    explanation: 'ヘッド固定がタンヤオや一盃口ができやすく有利。『迷ったときは亜リャンメン切り』とはいうが、今回の手で一番強い部分はマンズの中ぶくれの形。それに合わせて最大限に構えるヘッド固定が期待値最大となる。',
    accept_tiles: {
    "七筒" => 38,
    "六萬" => 37,
    "六索" => 33,
    }
  },
  
  
  
  


  
  
  
]

押し引き_quiz_data = [
  {
    tiles: %w[三萬 四萬 五萬 六萬 七萬 二筒 三筒 八筒 八筒 五索 七索 七索 九索 七索],
    correct: '五索',
    dora: '二筒',
    situation: '東1局 西家 8巡目',
    explanation: '浮いている五索と九索の比較。五索を残せば、赤五索や六索引きでのピンフ追加もあるが、マンズ3面待ち、ピンズはドラ含みのいい形のため今回は危険度重視で五索から切るようにしたい',
    accept_tiles: {
    "五索" => 19,
    "九索" => 19
    }
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
    explanation: 'ダブ東の2ハンは大きいので最終的に東待ちにできるように構える。打五筒と比べてわずか1枚損。',
    accept_tiles: {
    "五筒" => 18,
    "九萬" => 17,
    "八萬" => 15,
    "六萬" => 13
    }
  },
  {
    tiles: %w[六萬 六萬 二筒 三筒 三筒 三筒 四筒 五筒 二索 二索 三索 八索 八索 八索],
    correct: '二筒',
    dora: '七索',
    situation: '東1局 東家 7巡目',
    explanation: '受け入れ枚数の多い打二索と打三筒はタンヤオが崩れやすいので仕掛けづらい。その点、打二筒なら単純な受け入れ枚数こそ3番手だが、ツモ一索以外はタンヤオになる。ポンテン4倍速と考えるならこちらの方が早そう。実戦では受け入れ上位4種の使い分けとなるのである程度枚数差を把握しておくと場に対応しやすい。',
    accept_tiles: {
    "五萬" => 22,
    "一筒" => 20,
    "六萬" => 16,
    "二筒" => 16
    }
  },
  {
    tiles: %w[三萬 四萬 五萬 六萬 八萬 八萬 赤五筒 六筒 六筒 七筒 四索 五索 六索 六索],
    correct: '六索',
    dora: '西',
    situation: '東1局 東家 8巡目',
    explanation: '八萬対子をヘッドと見た場合、3456mは4連形、5667pは中ぶくれ、4566sは亜リャンメンだ。それぞれリャンメン以上ができる有効牌は4連形は4種、中ぶくれは4種、亜リャンメンは2種。一番リャンメンができづらい亜リャンメン切りが正解となる。',
    accept_tiles: {
    "六筒" => 46,
    "六索" => 42,
    "三萬" => 38,
    "六萬" => 38,
    "八萬" => 12
    }
  },
  {
    tiles: %w[三萬 四萬 四萬 五萬 三筒 三筒 五筒 六筒 七筒 八筒 五索 六索 七索 八索],
    correct: '八筒',
    dora: '西',
    situation: '東1局 東家 7巡目',
    explanation: 'タンヤオになりやすいマンズの中ぶくれは残すとして、ピンズとソーズのどちらの4連形を残す方がいいか？基本的にヘッドと干渉しない方が広いので打八筒が正解となる。（４枚差）最終形の比較でもそれぞれの3面まちができた場合に、ソーズの純粋な3面待ち（11枚）に対し、ピンズは亜リャンメン含みとなって2枚損となる。瞬間と広さと最終形、共に打八筒が有利。',
    accept_tiles: {
    "四萬" => 46,
    "五筒" => 42,
    "八筒" => 42,
    "五索" => 38,
    "八索" => 38,
    "三筒" => 12
    }
  },
  {
    tiles: %w[三萬 四萬 四萬 五萬 三筒 三筒 五筒 六筒 七筒 八筒 二索 三索 四索 五索],
    correct: '二索',
    dora: '西',
    situation: '東1局 東家 7巡目',
    explanation: '見逃しやすい345三色が見える。345s固定でマンズ中ぶくれへのくっつきと、ツモ3,4pに期待しよう。',
    accept_tiles: {
    "四萬" => 46,
    "五筒" => 42,
    "八筒" => 42,
    "二索" => 38,
    "五索" => 38,
    "三筒" => 12
    }
  },
  {
    tiles: %w[三萬 四萬 赤五萬 五萬 九萬 九萬 九萬 五筒 五筒 六筒 五索 六索 七索 八索],
    correct: '五萬',
    dora: '西',
    situation: '東1局 西家 7巡目',
    explanation: '迷った時は亜リャンメン切り。4連形には、4種の牌でリャンメンが作れると同時に、2種のヘッドができるという特徴がある。556pをヘッドでもメンツで使える形にできる、と考えると良い',
    accept_tiles: {
    "六筒" => 46,
    "五萬" => 41,
    "五索" => 37,
    "八索" => 37,
    "五筒" => 20
    }
  },
  {
    tiles: %w[四萬 四萬 赤五萬 七萬 八萬 九萬 赤五筒 六筒 七筒 八筒 四索 赤五索 六索 六索],
    correct: '六索',
    dora: '西',
    situation: '東1局 西 7巡目',
    explanation: '序盤なら赤3枚使い切れる打四萬としたいところだが、受け入れ枚数が違いすぎる。最終形や受け入れ枚数など総合的に考えた場合、一番バランスがいいのは打六索で上がり率と期待値は最大となる。',
    accept_tiles: {
    "赤五萬" => 46,
    "六索" => 40,
    "赤五筒" => 36,
    "八筒" => 36,
    "四萬" => 20
    }
  },
  {
    tiles: %w[三萬 四萬 四萬 赤五萬 六萬 七萬 三筒 四筒 五筒 六筒 三索 四索 赤五索 六索],
    correct: '六索',
    dora: '西',
    situation: '東1局 西 7巡目',
    explanation: '受け入れ最大の打三萬は聴牌率こそ最大になるが、上がり率となると36p36sの4種に劣る。ここはピンズかソーズから1枚切ってのメンツ固定がバランス的に良い。ピンズとソーズでは、赤を使っていないピンズ4連形をそのまま残した方が少しだけ得。三色はマンズの3面待ちを最終形に想定した場合、345狙いが有利。結論として微差だが打六索が期待値最大となる。なお、三色がなくても打三萬のヘッド固定は損。',
    accept_tiles: {
    "三萬" => 58,
    "三筒" => 51,
    "六筒" => 51,
    "三索" => 51,
    "六索" => 51,
    "四萬" => 23
    }
  },
  {
    tiles: %w[五萬 六萬 七萬 八萬 一筒 二筒 三筒 四筒 六索 七索 七索 八索 八索 八索],
    correct: '一筒',
    dora: '西',
    situation: '東1局 東家 7巡目',
    explanation: '端寄りの1234pは形の上では4連形だが、機能的には単独浮牌の四筒に毛が生えた程度で使いづらい。特にペンカン三筒にしかならないツモ二筒がいらない。',
    accept_tiles: {
    "七索" => 49,
    "六索" => 46,
    "一筒" => 42,
    "五萬" => 38,
    "八萬" => 38,
    "八索" => 19
    }
  },
  {
    tiles: %w[五萬 六萬 七萬 八萬 二筒 三筒 四筒 五筒 五索 六索 六索 七索 七索 七索],
    correct: '八萬',
    dora: '西',
    situation: '東1局 東家 7巡目',
    explanation: '優秀な形ばかりの贅沢な形。566777sの形は1枚切り出すことによって、[2メンツ][1メンツ+ヘッド]のどちらの形でも使えるので手をつけない。58m25pのどれを切っても聴牌率、上がり率は変わらないが、67p引で567の三色になるので、打八萬が正解となる。',
    accept_tiles: {
    "六索" => 53,
    "五索" => 50,
    "五萬" => 42,
    "八萬" => 42,
    "二筒" => 42,
    "七索" => 19
    }
  },
  {
    tiles: %w[七萬 八萬 九萬 一筒 一筒 二筒 三筒 二索 三索 三索 五索 六索 七索 八索],
    correct: '一筒',
    dora: '西',
    situation: '東1局 西家 7巡目',
    explanation: '1123pのような端寄りの亜リャンメンは14p引きで[1メンツ+ヘッド]になるが、同じ確率でカンチャンかペンチャン待ちの一盃口になってしまう。こう言った待ちの一盃口は期待値を著しく下げる。ここは愚形聴牌を避けることを優先する打一筒が正解。',
    accept_tiles: {
    "二索" => 34,
    "一筒" => 29,
    "八索" => 25,
    "三索" => 23
    }
  },
  {
    tiles: %w[五萬 六萬 七萬 八萬 二筒 二筒 四筒 五筒 六筒 七筒 六索 七索 七索 七索],
    correct: '八萬',
    dora: '西',
    situation: '東1局 東家 5巡目',
    explanation: '三色含みの構えが期待値最大となる。ツモ三筒でのタンピン三色に気付けば簡単。',
    accept_tiles: {
    "六索" => 50,
    "五萬" => 42,
    "八萬" => 42,
    "四筒" => 42,
    "七筒" => 42,
    "二筒" => 21
    }
  },
  {
    tiles: %w[四萬 五萬 六萬 七萬 三筒 三筒 五筒 六筒 七筒 八筒 六索 八索 八索 八索],
    correct: '八筒',
    dora: '西',
    situation: '東1局 東家 5巡目',
    explanation: '広いのは六索切りだが、六索残しにはタンヤオや三色になりやすく赤五索が使えるなどのメリットが多い。三筒ヘッド固定のくっつき聴牌狙いが正解。',
    accept_tiles: {
    "六索" => 50,
    "五筒" => 46,
    "八筒" => 46,
    "四萬" => 38,
    "七萬" => 38,
    "三筒" => 17
    }
  },
  {
    tiles: %w[四筒 四筒 五筒 五筒 五筒 六筒 二索 三索 四索 四索 四索 七索 八索 八索],
    correct: '五筒',
    dora: '一索',
    situation: '東1局 東家 6巡目',
    explanation: '遠くに四暗刻が見えるが、そのためには六筒か七索を索を切って対子固定しなければならない。目先の親漫画見えるため、バランスというより現実的な線引きで打五筒推奨。四暗刻で進めた場合、二索や三索などが重なればツモリ四暗刻1シャンテんだが五筒を切っていた場合でも二盃口1シャンテンになるので悪くない。受け入れ最大は打八索だが打五筒とは僅か一枚差のため期待値で劣る。',
    accept_tiles: {
    "八索" => 23,
    "五筒" => 22,
    "六筒" => 17,
    "七索" => 17,
    "四筒" => 16
    }
  },
  {
    tiles: %w[三筒 三筒 四筒 四筒 六筒 八筒 八筒 二索 二索 三萬 四萬 赤五萬 五萬 六萬],
    correct: '六筒',
    dora: '九萬',
    situation: '東1局 東家 7巡目',
    explanation: 'メンツ手を見ながら七対子1シャンテンにも受ける。裏目は七筒のみ。25p引きは七対子を見切って、八筒か二索対子落としでタンピン一盃口に向かう。',
    accept_tiles: {
    "三萬" => 9,
    "四萬" => 9,
    "六萬" => 9,
    "六筒" => 9
    }
  },
  {
    tiles: %w[二萬 三萬 四萬 五萬 二筒 三筒 三筒 五筒 二索 三索 四索 八索 八索 八索],
    correct: '五筒',
    dora: '七索',
    situation: '東1局 西家 8巡目',
    explanation: '打二筒は聴牌確率こそ最大だが、愚形聴牌を多く含むため上がり確率と期待値では打五筒に劣る。ゴールはテンパイではなく、アガリのはず。ここは二萬と五萬の縦ツモでもリャンメン聴牌になるように受けよう。最悪はツモ一筒だが、それでもノベタン聴牌。',
    accept_tiles: {
    "二筒" => 41,
    "五筒" => 37,
    "二萬" => 24,
    "五萬" => 24,
    "三筒" => 20
    }
  },
  {
    tiles: %w[三筒 四筒 赤五筒 五筒 五筒 七筒 三索 三索 四索 四索 四索 五索 六索 六索],
    correct: '七筒',
    dora: '六筒',
    situation: '東1局 東家 6巡目',
    explanation: 'ドラ七筒を温存して打四索や打六索と構えたいが、ドラ表示牌のカン六筒がネック。しかも六筒チーではマンガンに届かず、微妙。ソーズ引での面前聴牌は打点十分で結局ドラ七筒切りになる。まさかの四暗刻もあるので七筒切りが1番バランスの取れた一打となり期待値でも最大となる。',
    accept_tiles: {
    "六索" => 23,
    "七筒" => 21,
    "五筒" => 20,
    "四索" => 20,
    "三索" => 19
    }
  },
  {
    tiles: %w[赤五萬 五萬 五萬 六萬 二筒 二筒 三筒 四筒 赤五筒 七筒 六索 八索 八索 八索],
    correct: '六萬',
    dora: '五索',
    situation: '東1局 東家 6巡目',
    explanation: 'マンズ部分がそのままの最終形になれば3面待ちだが、その場合はドラ六索が出る。ドラが使えれば鳴いてもタンヤオドラ3のマンガンなので打点上昇率は一番良い。実戦では使い分けになるが、『鳴いてもマンガン確定』は強く、愚形聴牌の可能性があっても狙う価値は十分にある。',
    accept_tiles: {
    "六萬" => 36,
    "六索" => 36,
    "七筒" => 34,
    "二筒" => 22
    }
  },
  {
    tiles: %w[一萬 三萬 赤五萬 六萬 六萬 七萬 二筒 三筒 四筒 六筒 七筒 四索 五索 六索],
    correct: '一萬',
    dora: '三索',
    situation: '東1局 西家 7巡目',
    explanation: '受け入れ最大は打6萬だが、ヘッドが完全になくなり後々苦労しそう。打七萬でリャンカンに構えるより、打一萬の方が打点でも広さでも有利となる形だ。打一萬ならツモ346mでタンピン聴牌になり、広さと打点のバランスが良い。その後578mなどをツモった場合には段違いの差で一萬が有利。',
    accept_tiles: {
    "六萬" => 24,
    "一萬" => 17,
    "七萬" => 16,
    }
  },
  {
    tiles: %w[赤五萬 六萬 七萬 八萬 九萬 三筒 四筒 六筒 六筒 六筒 七筒 二索 三索 四索],
    correct: '九萬',
    dora: '八索',
    situation: '東1局 西家 7巡目',
    explanation: '広いのは当然打七筒だが、最悪のツモ六萬では打赤五萬のリーチのみとなってしまう。打九萬ならタンヤオと赤五萬使いが確定となるので受け入れの差に十分見合う。ツモ五筒なら4面待ちになる。',
    accept_tiles: {
    "七筒" => 33,
    "赤五萬" => 21,
    "九萬" => 21,
    }
  },
  {
    tiles: %w[三萬 四萬 五萬 六萬 六萬 八萬 四筒 四筒 六筒 三索 四索 五索 九索 九索],
    correct: '九索',
    dora: '三索',
    situation: '東1局 西家 4巡目',
    explanation: 'このまま真っ直ぐ進めても役がない。3ヘッドなので対子を1つ落としてもスピードはさほど変わらない。九索対子がなくなればタンヤオ確定で動けるようにもなる',
    accept_tiles: {
    "三萬" => 12,
    "六萬" => 12,
    "八萬" => 10,
    }
  },
  {
    tiles: %w[三萬 四萬 五萬 六萬 六萬 八萬 四筒 四筒 六筒 三索 四索 五索 東 東],
    correct: '八萬',
    dora: '三索',
    situation: '東1局 西家 4巡目',
    explanation: '東が役牌ならポンやシャボリーチをする前提で3ヘッドに構える。ツモ次第で345か456の三色に変化する。',
    accept_tiles: {
    "六萬" => 12,
    "四筒" => 12,
    "八萬" => 10,
    }
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
