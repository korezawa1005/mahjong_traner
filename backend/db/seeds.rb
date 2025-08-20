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
    explanation: 'ソーズはどの牌を切っても受け入れ枚数は同じです。ここではピンフがつく形を意識して、リャンカンに構えるのが効果的です。',
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
    explanation: 'ここではタンヤオを確定させるのが有効です。打点を確保できるだけでなく、状況によってはかわし手としても機能します。',
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
    explanation: 'リャンメンを固定して、ピンフにつながりやすい形に整えます。マンズは五・七・八萬の3種類が有効牌となるので、大切に残しておきましょう',
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
    explanation: '二筒と八筒の選択場面です。八筒を切れば一盃口が見えやすくなりますが、二筒を切った方が単純に受け入れが広がります。両者には5枚分の差があるため、ここでは広さを優先して二筒を切るのが望ましいでしょう。',
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
    explanation: '567筒のメンツを抜き出すと、3面受けに七筒がくっついた形になります。ソーズでヘッドを固定して四索を切れば、受け入れの広さと打点の両面で優れた選択となります。',
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
    explanation: 'この形は、ヘッド候補が2つあるかどうかで受け入れ枚数が大きく変わります。選択肢は「打五筒」か「打四索」の2つですが、受け入れの枚数は五筒を切る方が約3枚多くなります。一方で、打点が欲しい場面であれば、二筒を切って手役を意識する方が良い選択になるでしょう',
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
    explanation: '567の三色も見えますが、ここは素直に完全イーシャンテンに構えるのが良いでしょう。三色を狙って三萬を切ると、仮に七索を引いても最終形がカンチャン待ちになり苦しくなります。そのため、この局面では七筒を切るのが望ましい選択となります。',
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
    explanation: '一見複雑に見えますが、567筒の完成メンツを抜き出して考えると、受け入れが最も少ないのは七筒であることが分かります。',
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
    explanation: 'この形はヘッドが3つあるため、3筒を切るか4索を切ってリャンメンを固定するのが良いでしょう。ピンズは自分で必要牌を1枚使ってしまっているので、ソーズを残す判断が有効です。さらに、ポンテンは「4倍速」とも言われ、わずか1枚の差であっても侮れない重要な差になります。',
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
    explanation: '最大の受け入れになるのは二索を切った場合です。ここは素直にシンプルに構えましょう。',
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
    explanation: 'ここでは喰いタン狙いで一筒を切る選択は取りません。ヘッドが3つある形なので、2ヘッドに絞って構えるのが良いでしょう。五萬を切れば受け入れが最も広くなり、その差は約2枚です。556m133p22sに加えて345678pの完成メンツを抜き出してみると、確かにヘッドが3つあることが確認できます。',
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
    explanation: 'ドラ3のリャンシャンテンです。イーシャンテンになった際に2ヘッドで構えられるよう、ここでは3ヘッドを維持して進めます。喰いタンに移行しやすい点もメリットです。八筒を切る選択も、打点面や対人要素（先に八筒を切ることで九筒が出やすくなる）を考えると悪くありません。ただし、牌効率の観点からは、677888pのような複合形にはギリギリまで手をかけない方が良いでしょう。',
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
    explanation: 'ドラ3の二シャンテンです。次に一シャンテンへ進んだ際に2ヘッドで構えられるよう、ここでは3ヘッドを維持しておきます。喰いタンへ移行しやすい点もメリットです。八筒を切る選択も、打点や対人要素（先に八筒を切ることで九筒が出やすくなる）を考えれば一理あります。ただし牌効率の観点では、677888pのような複合形には極力手をかけない方が良いでしょう。',
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
    explanation: '八萬を切れば一盃口の目は残りますが、最終形を考えると三筒を先に引く必要があり条件が厳しくなります。すでに打点は十分確保できているため、ここでは四筒を切って受け入れ枚数を最大化しましょう。その場合、最終形もリャンメン待ちとなり理想的です。',
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
    explanation: '受け入れを最大に広げる七萬切りが正解です。2分の1の確率でタンヤオは崩れますが、最高形はメンタンピン一盃口赤となり、打点は十分に確保できます。四筒や八萬を切る選択は、出た牌をすべて仕掛けてトップを狙うような打ち方であり、東1局の序盤に選ぶ打牌ではありません。現代麻雀の基本は「好形のメンゼン手を作ってリーチを目指す」ことです。',
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
    explanation: '受け入れを最大にしつつ、平和がつきやすい形に構えるのが良いでしょう。一盃口の目は残りませんが、最終形がペン七索では心許なく、そもそも七索自体の残り枚数が少ないため一盃口は完成しにくいです。仮に完成したとしても平和が消えてしまうため、どうしても打点が欲しい場面を除けば、端寄りの一盃口は狙わない方が賢明です。',
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
    explanation: '三索でヘッドを固定するのが、受け入れ枚数・期待値ともに最も高い選択です。最高形は三筒を引いた場合のタンピン一盃口となります。また、見方によっては二索と五索を浮き牌と捉えることもできますが、この二牌は筋でつながっているため、両方を残す意味は薄いでしょう。',
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
    explanation: '二索を切れば469索のリャンメンカンチャン受けになりますが、今回の形には単独ヘッドがないため、一筒を切った方が受け入れは最大となります。最大でも待ちが六枚しかない亜リャンメンに頼るよりも、純粋なリャンメン待ちを作る方が安定した選択といえるでしょう。',
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
    explanation: 'アンコの隣は面子が作りにくいため、ここでは2つの四連形を活かして多面待ちを目指しましょう。八索が入ってもタンヤオは崩れやすく、三色にもならないので優先度は低いといえます。',
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
    explanation: '7799萬から1枚を切って3枚構成に整えます。最終形が中とのシャボ待ちになった場合に和了しやすいよう、端寄りの牌を対子で残しておくのが有効です。',
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
    explanation: 'ここはメンタンピン狙いが基本です。一筒引きでタンヤオは崩れますが、内側に寄せて完全イーシャンテンを目指す進行が適切です。',
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
    explanation: '序盤であればシャンテンを戻してでも九萬を切り、タンヤオに向かう選択もあります。しかし8巡目で親番なら、八萬を引いた際の最速聴牌を逃さない構えが望ましいです。リーチをすれば一盃口と赤で7700点となるため、残り3枚のカンチャン待ちであっても即リーチが基本となります。また、六萬を引けば完全イーシャンテンに変化する可能性もあります。六筒を切って3面待ちに固定するのも柔軟な打ち方ですが、7700点以上を狙うには時間がかかってしまうでしょう。',
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
    explanation: 'マンズの受け入れが広いため、完全イーシャンテンに変化させるよりも、即リーチに持ち込める可能性の方が高い状況です。ここではマンズを引いて聴牌した際の最終形を重視して打牌を選びましょう。',
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
    explanation: '中ぶくれの形はヘッド固定と相性が良いです。仮に五筒を切っても最終形が14p待ちになる可能性は低いため、それよりも六筒を引いた際にリャンメン聴牌へ移行できる形を逃さないように構えるのが望ましいでしょう。',
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
    explanation: '三筒を切る場合と五索を切る場合で受け入れ枚数は同じですが、面前期待値だけを考えれば三筒切りの方が優秀です。ただし赤五索を引いてマンガンが確定している状況では、鳴き効率を重視した打牌選択が有効になります。具体的には、三筒・二索・三索はポン、四筒・六索はチーで対応します。なお、三索はチーではなくポンすることがポイントです。三索を3枚さらすことで、二索が場に出やすくなる効果も期待できます。',
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
    explanation: 'ドラの七筒を残しても、六筒を引いた場合以外の聴牌は結局ドラ切りになってしまいます。ドラ表示牌である六筒を引く確率と、一盃口ができる五索を引く確率は同じです。確かにドラの縦引きは魅力的ですが、それよりも六索が暗刻になって聴牌する形の方が価値が高いといえるでしょう。',
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
    explanation: '五萬をヘッドに固定すればタンピン二盃口まで狙える形になりますが、五萬を切った場合とは有効枚数に大きな差があります。特にこの形では一筒を引いた瞬間にバランスが崩れてしまうため、ここは素直に受け入れ枚数を最大に取るのが正解です。',
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
    explanation: 'ヘッドを固定することでタンヤオや一盃口が狙いやすくなり、有利に進められます。「迷ったときは亜リャンメン切り」とも言われますが、この手で最も強い部分はマンズの中ぶくれの形です。それに合わせて構えることで、期待値を最大化できるでしょう。',
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
