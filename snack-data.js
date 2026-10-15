// 代表的なお菓子マスターデータ（名前、ひらがな、ジャンル、参考価格、形状タイプ、特徴）
const SNACK_CATEGORIES = [
  { id: 'choco', name: 'チョコ', icon: '🍫', color: '#795548', bg: '#efebe9' },
  { id: 'candy', name: 'アメ', icon: '🍬', color: '#e91e63', bg: '#fce4ec' },
  { id: 'gummy', name: 'グミ', icon: '🐻', color: '#ff9800', bg: '#fff3e0' },
  { id: 'snack', name: 'スナックがし', icon: '🍿', svgIcon: 'snack_bag', color: '#fbc02d', bg: '#fffde7' },
  { id: 'dagashi', name: 'だがし', icon: '🍭', svgIcon: 'dagashi_stick', color: '#4caf50', bg: '#e8f5e9' },
  { id: 'ramune', name: 'ラムネ・タブレット', icon: '💊', color: '#00bcd4', bg: '#e0f7fa' },
  { id: 'senbei', name: 'おせんべい', icon: '🍘', color: '#8d6e63', bg: '#efebe9' },
  { id: 'jelly', name: 'マシュマロ・ゼリー', icon: '🍡', color: '#ab47bc', bg: '#f3e5f5' },
  { id: 'custom', name: 'ちょくせつにゅうりょく', icon: '✏️', color: '#3f51b5', bg: '#e8eaf6' }
];

// 定番お菓子マスター（形状・実物写真URL・リアルデザイン定義付き）
const DEFAULT_SNACKS = [
  // 🍫 チョコ
  { 
    id: 'c1', name: 'チロルチョコ', kana: 'ちろるちょこ', category: 'choco', price: 25, 
    color: '#8d6e63', sub: 'ミルク・ビス', shape: 'cube',
    imgUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80',
    detail: '正方形のミニチョコ'
  },
  { 
    id: 'c2', name: 'ブラックサンダー', kana: 'ぶらっくさんだー', category: 'choco', price: 38, 
    color: '#212121', sub: 'おいしさイナズマ級', shape: 'bar',
    imgUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    detail: 'イナズマデザイン'
  },
  { 
    id: 'c3', name: 'きのこの山', kana: 'きのこのやま', category: 'choco', price: 160, 
    color: '#5d4037', sub: 'チョコ＆クラッカー', shape: 'box',
    imgUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=400&q=80',
    detail: 'きのこ型チョコ'
  },
  { 
    id: 'c4', name: 'たけのこの里', kana: 'たけのこのさと', category: 'choco', price: 160, 
    color: '#33691e', sub: 'チョコ＆クッキー', shape: 'box',
    imgUrl: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=400&q=80',
    detail: 'たけのこ型クッキー'
  },
  { 
    id: 'c5', name: 'コアラのマーチ', kana: 'こあらのまーち', category: 'choco', price: 110, 
    color: '#fbc02d', sub: 'チョコ入りビスケット', shape: 'hex_box',
    imgUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    detail: '六角形の緑の箱'
  },
  { 
    id: 'c6', name: 'ポッキー', kana: 'ぽっきー', category: 'choco', price: 170, 
    color: '#c62828', sub: 'チョコレートスティック', shape: 'tall_box',
    imgUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=80',
    detail: '真っ赤な細長い箱'
  },
  { 
    id: 'c7', name: 'キットカット', kana: 'きっとかっと', category: 'choco', price: 140, 
    color: '#b71c1c', sub: 'サクサクウエハース', shape: 'bar',
    imgUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&q=80',
    detail: '赤パッケージ'
  },
  { 
    id: 'c8', name: 'アポロチョコ', kana: 'あぽろちょこ', category: 'choco', price: 130, 
    color: '#f48fb1', sub: 'いちごチョコ三角', shape: 'box',
    imgUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80',
    detail: 'いちご＆チョコ'
  },

  // 🍬 アメ
  { 
    id: 'a1', name: 'チュッパチャプス', kana: 'ちゅっぱちゃぷす', category: 'candy', price: 45, 
    color: '#f44336', sub: '棒つきキャンディ', shape: 'lollipop',
    imgUrl: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=400&q=80',
    detail: 'まあるい棒付きアメ'
  },
  { 
    id: 'a2', name: 'ポップキャンディ', kana: 'ぽっぷきゃんでぃ', category: 'candy', price: 30, 
    color: '#ff4081', sub: 'ペコちゃんアメ', shape: 'lollipop',
    imgUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80',
    detail: '平べったい棒つきアメ'
  },
  { 
    id: 'a3', name: 'ミルキー', kana: 'みるきー', category: 'candy', price: 120, 
    color: '#e91e63', sub: 'ミルクキャンディ', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400&q=80',
    detail: '包み紙の丸いアメ'
  },
  { 
    id: 'a4', name: 'ハイチュウ', kana: 'はいちゅう', category: 'candy', price: 110, 
    color: '#9c27b0', sub: 'スティックソフトキャンディ', shape: 'stick_pack',
    imgUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=400&q=80',
    detail: '四角い包み'
  },
  { 
    id: 'a5', name: 'パインアメ', kana: 'ぱいんあめ', category: 'candy', price: 120, 
    color: '#fbc02d', sub: '穴あきパイナップル味', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=400&q=80',
    detail: '黄色い輪っかアメ'
  },

  // 🐻 グミ
  { 
    id: 'g1', name: '果汁グミ（ぶどう）', kana: 'かじゅうぐみ', category: 'gummy', price: 120, 
    color: '#7b1fa2', sub: 'ぶどう果汁100%', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80',
    detail: 'ぶどうの実の形'
  },
  { 
    id: 'g2', name: 'ピュレグミ（レモン）', kana: 'ぴゅれぐみ', category: 'gummy', price: 130, 
    color: '#fdd835', sub: 'すっぱいパウダーハート型', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=400&q=80',
    detail: 'ハートの形のグミ'
  },
  { 
    id: 'g3', name: 'タフグミ', kana: 'たふぐみ', category: 'gummy', price: 180, 
    color: '#263238', sub: '大容量ハードキューブ', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400&q=80',
    detail: '黒い大きな袋'
  },
  { 
    id: 'g4', name: 'ハリボー（ゴールドベア）', kana: 'はりぼー', category: 'gummy', price: 150, 
    color: '#e53935', sub: '黄色い袋のクマさん', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80',
    detail: '黄色い袋にクマ'
  },

  // 🍿 スナック菓子（袋お菓子）
  { 
    id: 's1', name: 'うすしおポテトチップス', kana: 'ぽてとちっぷす', category: 'snack', price: 130, 
    color: '#fbc02d', sub: 'かるいしおあじ大袋', shape: 'pillow_bag',
    imgUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    detail: 'ふっくら大きな袋'
  },
  { 
    id: 's2', name: 'コンソメパンチ', kana: 'こんそめぱんち', category: 'snack', price: 130, 
    color: '#e65100', sub: 'オレンジのポテト袋', shape: 'pillow_bag',
    imgUrl: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=400&q=80',
    detail: 'オレンジの袋'
  },
  { 
    id: 's3', name: 'じゃがりこ（サラダ）', kana: 'じゃがりこ', category: 'snack', price: 150, 
    color: '#2e7d32', sub: '緑のカップ容器', shape: 'cup',
    imgUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    detail: '緑のカップとスティック'
  },
  { 
    id: 's4', name: 'かっぱえびせん', kana: 'かっぱえびせん', category: 'snack', price: 120, 
    color: '#c62828', sub: '赤いエビの袋', shape: 'pillow_bag',
    imgUrl: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&q=80',
    detail: 'エビの絵の袋'
  },
  { 
    id: 's5', name: 'チップスター', kana: 'ちっぷすたー', category: 'snack', price: 120, 
    color: '#d32f2f', sub: '赤い筒型ケース', shape: 'cylinder',
    imgUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    detail: '丸い筒に入ったポテト'
  },
  { 
    id: 's6', name: 'ピザポテト', kana: 'ぴざぽてと', category: 'snack', price: 150, 
    color: '#ff6f00', sub: 'ギザギザ濃厚チーズ', shape: 'pillow_bag',
    imgUrl: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=400&q=80',
    detail: '黒と赤の袋'
  },

  // 🍭 だがし（うまい棒・駄菓子各種）
  { 
    id: 'd1', name: 'うまい棒（コーンポタージュ）', kana: 'うまいぼう', category: 'dagashi', price: 12, 
    color: '#fbc02d', sub: '黄色い細長い棒菓子', shape: 'long_stick',
    imgUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    detail: '黄色いスティック袋'
  },
  { 
    id: 'd2', name: 'うまい棒（めんたい）', kana: 'うまいぼうめんたい', category: 'dagashi', price: 12, 
    color: '#d32f2f', sub: '紫色の細長い棒菓子', shape: 'long_stick',
    imgUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    detail: '紫のスティック袋'
  },
  { 
    id: 'd3', name: 'うまい棒（チーズ）', kana: 'うまいぼうちーず', category: 'dagashi', price: 12, 
    color: '#ff9800', sub: 'オレンジの細長い棒菓子', shape: 'long_stick',
    imgUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    detail: 'オレンジのスティック'
  },
  { 
    id: 'd4', name: 'キャベツ太郎', kana: 'きゃべつたろう', category: 'dagashi', price: 30, 
    color: '#2e7d32', sub: '丸い緑の袋スナック', shape: 'small_bag',
    imgUrl: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=400&q=80',
    detail: '緑のカエルの小袋'
  },
  { 
    id: 'd5', name: '蒲焼さん太郎', kana: 'かばやきさんたろう', category: 'dagashi', price: 15, 
    color: '#4e342e', sub: '平たいシート菓子', shape: 'flat_sheet',
    imgUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    detail: '茶色の薄い袋'
  },
  { 
    id: 'd6', name: 'ビッグカツ', kana: 'びっぐかつ', category: 'dagashi', price: 35, 
    color: '#bf360c', sub: '細長いカツの形', shape: 'bar',
    imgUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    detail: 'サクサクカツ'
  },
  { 
    id: 'd7', name: 'クッピーラムネ', kana: 'くっぴーらむね', category: 'dagashi', price: 25, 
    color: '#0288d1', sub: 'ウサギとリスの小袋', shape: 'small_bag',
    imgUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80',
    detail: '水色とピンクの小袋'
  },

  // 💊 ラムネ・タブレット
  { 
    id: 'r1', name: '森永ラムネ', kana: 'もりながらむね', category: 'ramune', price: 80, 
    color: '#00acc1', sub: '緑のラムネ瓶の形', shape: 'bottle',
    imgUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80',
    detail: 'ラムネ瓶容器'
  },
  { 
    id: 'r2', name: 'メントス（グレープ）', kana: 'めんとす', category: 'ramune', price: 120, 
    color: '#6a1b9a', sub: '紫の丸い筒', shape: 'cylinder',
    imgUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=400&q=80',
    detail: '紫の細長いロール'
  },
  { 
    id: 'r3', name: 'ハイレモン', kana: 'はいれもん', category: 'ramune', price: 130, 
    color: '#fbc02d', sub: '黄色い押し出しシート', shape: 'blister_box',
    imgUrl: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=400&q=80',
    detail: '黄色い箱のシート'
  },

  // 🍘 おせんべい
  { 
    id: 'b1', name: 'ハッピーターン', kana: 'はっぴーたーん', category: 'senbei', price: 110, 
    color: '#ffb300', sub: 'オレンジの細長い個包装', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    detail: 'キャンディ包みのせんべい'
  },
  { 
    id: 'b2', name: 'ぽたぽた焼', kana: 'ぽたぽたやき', category: 'senbei', price: 130, 
    color: '#d84315', sub: '丸いおばあちゃんの袋', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    detail: '丸いあまからせんべい'
  },
  { 
    id: 'b3', name: 'おにぎりせんべい', kana: 'おにぎりせんべい', category: 'senbei', price: 120, 
    color: '#ff6f00', sub: '三角のしょうゆせんべい', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    detail: '三角のせんべい'
  },
  { 
    id: 'b4', name: 'ばかうけ（青のり）', kana: 'ばかうけ', category: 'senbei', price: 120, 
    color: '#2e7d32', sub: 'バナナ型細長せんべい', shape: 'bag',
    imgUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    detail: '細長い青のりせんべい'
  },

  // 🍡 マシュマロ・ゼリー
  { 
    id: 'm1', name: 'くだものゼリー（みかん）', kana: 'ぜりー', category: 'jelly', price: 130, 
    color: '#ff9800', sub: 'カップゼリー', shape: 'jelly_cup',
    imgUrl: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&q=80',
    detail: 'みかん入り透明カップ'
  },
  { 
    id: 'm2', name: 'チョコ入りマシュマロ', kana: 'ましゅまろ', category: 'jelly', price: 60, 
    color: '#6d4c41', sub: '白いふわふわ個包装', shape: 'small_bag',
    imgUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=400&q=80',
    detail: '白くて丸いマシュマロ'
  },
  { 
    id: 'm3', name: 'ぷるんと蒟蒻ゼリー', kana: 'こんにゃくぜりー', category: 'jelly', price: 120, 
    color: '#c2185b', sub: 'パウチゼリー', shape: 'pouch',
    imgUrl: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&q=80',
    detail: '吸って食べるパウチ'
  }
];

// キーワードによる自動価格判定エンジン
const PRICE_RULES = [
  { match: /チロル|ブラックサンダー|うまい棒|ヤッター|どんぐりガム|蒲焼/, price: 20 },
  { match: /駄菓子|だがし|ラムネ|ガム|モロッコ|キャベツ太郎|ビッグカツ|よっちゃん/, price: 40 },
  { match: /ハイチュウ|ぷっちょ|マシュマロ|チュッパ|ジューC/, price: 70 },
  { match: /コアラ|ベビースター|ポップキャンディ|森永ラムネ|ソフト/, price: 100 },
  { match: /チョコ|グミ|ポテチ|ポテト|ポッキー|せんべい|ゼリー|ハッピー|ばかうけ|雪の宿/, price: 130 },
  { match: /じゃがりこ|きのこ|たけのこ|ピザポテト|ハリボー|チップスター|キットカット/, price: 160 }
];

// ジャンルごとの標準価格
const CATEGORY_DEFAULT_PRICE = {
  choco: 130,
  candy: 80,
  gummy: 120,
  snack: 130,
  dagashi: 25,
  ramune: 90,
  senbei: 120,
  jelly: 100,
  custom: 100
};

// 名前から値段を自動判定する関数
function lookupSnackPrice(name, category = 'custom') {
  if (!name) return CATEGORY_DEFAULT_PRICE[category] || 100;
  
  const cleanName = name.replace(/\s+/g, '').toLowerCase();
  const matched = DEFAULT_SNACKS.find(s => 
    cleanName.includes(s.name.toLowerCase()) || 
    s.name.toLowerCase().includes(cleanName) ||
    cleanName.includes(s.kana)
  );
  if (matched) return matched.price;

  for (const rule of PRICE_RULES) {
    if (rule.match.test(name)) {
      return rule.price;
    }
  }

  return CATEGORY_DEFAULT_PRICE[category] || 100;
}
