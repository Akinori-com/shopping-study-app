// だいひょうてきな おかし ますたーでーた（じゃんる ていぎ：ひらがなひょうき）
const SNACK_CATEGORIES = [
  { id: 'choco', name: 'ちょこ', icon: '🍫', color: '#795548', bg: '#efebe9' },
  { id: 'candy', name: 'あめ', icon: '🍬', color: '#e91e63', bg: '#fce4ec' },
  { id: 'gummy', name: 'ぐみ', icon: '🐻', color: '#ff9800', bg: '#fff3e0' },
  { id: 'snack', name: 'すなっくがし', icon: '🍿', svgIcon: 'snack_bag', color: '#fbc02d', bg: '#fffde7' },
  { id: 'dagashi', name: 'だがし', icon: '🍭', svgIcon: 'dagashi_stick', color: '#4caf50', bg: '#e8f5e9' },
  { id: 'ramune', name: 'らむね・たぶれっと', icon: '💊', color: '#00bcd4', bg: '#e0f7fa' },
  { id: 'senbei', name: 'おせんべい', icon: '🍘', color: '#8d6e63', bg: '#efebe9' },
  { id: 'jelly', name: 'ましゅまろ・ぜりー', icon: '🍡', color: '#ab47bc', bg: '#f3e5f5' },
  { id: 'custom', name: 'ちょくせつにゅうりょく', icon: '✏️', color: '#3f51b5', bg: '#e8eaf6' }
];

// ていばん おかし ますたー（すべて ひらがなひょうき）
const DEFAULT_SNACKS = [
  {
    "id": "b1",
    "name": "はっぴーたーん",
    "kana": "はっぴーたーん",
    "category": "senbei",
    "price": 110,
    "images": [
      "images/packages/b1_main.jpg",
      "images/packages/b1_2.jpg",
      "images/packages/b1_3.jpg"
    ]
  },
  {
    "id": "b2",
    "name": "ぽたぽたやき",
    "kana": "ぽたぽたやき",
    "category": "senbei",
    "price": 130,
    "images": [
      "images/packages/b2_main.jpg",
      "images/packages/b2_2.jpg",
      "images/packages/b2_1.jpg"
    ]
  },
  {
    "id": "b3",
    "name": "おにぎりせんべい",
    "kana": "おにぎりせんべい",
    "category": "senbei",
    "price": 120,
    "images": [
      "images/packages/b3_main.jpg",
      "images/packages/b3_2.jpg",
      "images/packages/b3_3.jpg"
    ]
  },
  {
    "id": "b4",
    "name": "ゆきのやど",
    "kana": "ゆきのやど",
    "category": "senbei",
    "price": 130,
    "images": [
      "images/packages/b4_main.jpg",
      "images/packages/b4_2.jpg",
      "images/packages/b4_3.jpg"
    ]
  },
  {
    "id": "b5",
    "name": "ばかうけ（あおのり）",
    "kana": "ばかうけ",
    "category": "senbei",
    "price": 120,
    "images": [
      "images/packages/b5_main.jpg",
      "images/packages/b5_2.jpg",
      "images/packages/b5_3.jpg"
    ]
  },
  {
    "id": "b6",
    "name": "かきのたね",
    "kana": "かきのたね",
    "category": "senbei",
    "price": 140,
    "images": [
      "images/packages/b6_main.jpg",
      "images/packages/b6_2.jpg",
      "images/packages/b6_3.jpg"
    ]
  },
  {
    "id": "c1",
    "name": "ちろるちょこ",
    "kana": "ちろるちょこ",
    "category": "choco",
    "price": 25,
    "images": [
      "images/packages/c1_main.jpg",
      "images/packages/c1_2.jpg",
      "images/packages/c1_3.jpg"
    ]
  },
  {
    "id": "c2",
    "name": "ぶらっくさんだー",
    "kana": "ぶらっくさんだー",
    "category": "choco",
    "price": 38,
    "images": [
      "images/packages/c2_main.jpg",
      "images/packages/c2_2.jpg",
      "images/packages/c2_3.jpg"
    ]
  },
  {
    "id": "c3",
    "name": "きのこのやま",
    "kana": "きのこのやま",
    "category": "choco",
    "price": 160,
    "images": [
      "images/packages/c3_main.jpg",
      "images/packages/c3_1.jpg",
      "images/packages/c3_3.jpg"
    ]
  },
  {
    "id": "c4",
    "name": "たけのこのさと",
    "kana": "たけのこのさと",
    "category": "choco",
    "price": 160,
    "images": [
      "images/packages/c4_main.jpg",
      "images/packages/c4_1.jpg",
      "images/packages/c4_2.jpg"
    ]
  },
  {
    "id": "c5",
    "name": "こあらのまーち",
    "kana": "こあらのまーち",
    "category": "choco",
    "price": 110,
    "images": [
      "images/packages/c5_main.jpg",
      "images/packages/c5_1.jpg",
      "images/packages/c5_3.jpg"
    ]
  },
  {
    "id": "c6",
    "name": "ぽっきー",
    "kana": "ぽっきー",
    "category": "choco",
    "price": 170,
    "images": [
      "images/packages/c6_main.jpg",
      "images/packages/c6_2.jpg",
      "images/packages/c6_3.jpg"
    ]
  },
  {
    "id": "c7",
    "name": "きっとかっと",
    "kana": "きっとかっと",
    "category": "choco",
    "price": 140,
    "images": [
      "images/packages/c7_main.jpg",
      "images/packages/c7_2.jpg",
      "images/packages/c7_3.jpg"
    ]
  },
  {
    "id": "c8",
    "name": "あぽろちょこ",
    "kana": "あぽろちょこ",
    "category": "choco",
    "price": 130,
    "images": [
      "images/packages/c8_main.jpg",
      "images/packages/c8_1.jpg",
      "images/packages/c8_3.jpg"
    ]
  },
  {
    "id": "c9",
    "name": "ちょこぼーる",
    "kana": "ちょこぼーる",
    "category": "choco",
    "price": 90,
    "images": [
      "images/packages/c9_main.jpg",
      "images/packages/c9_2.jpg",
      "images/packages/c9_3.jpg"
    ]
  },
  {
    "id": "c10",
    "name": "まーぶるちょこ",
    "kana": "まーぶるちょこ",
    "category": "choco",
    "price": 120,
    "images": [
      "images/packages/c10_main.jpg",
      "images/packages/c10_2.jpg",
      "images/packages/c10_3.jpg"
    ]
  },
  {
    "id": "s1",
    "name": "ぽてとちっぷす（うすしお）",
    "kana": "ぽてとちっぷす",
    "category": "snack",
    "price": 130,
    "images": [
      "images/packages/s1_main.jpg",
      "images/packages/s1_1.jpg",
      "images/packages/s1_2.jpg"
    ]
  },
  {
    "id": "s2",
    "name": "こんそめぱんち",
    "kana": "こんそめぱんち",
    "category": "snack",
    "price": 130,
    "images": [
      "images/packages/s2_main.jpg",
      "images/packages/s2_1.jpg",
      "images/packages/s2_2.jpg"
    ]
  },
  {
    "id": "s3",
    "name": "じゃがりこ（さらだ）",
    "kana": "じゃがりこ",
    "category": "snack",
    "price": 150,
    "images": [
      "images/packages/s3_main.jpg",
      "images/packages/s3_2.jpg",
      "images/packages/s3_3.jpg"
    ]
  },
  {
    "id": "s4",
    "name": "かっぱえびせん",
    "kana": "かっぱえびせん",
    "category": "snack",
    "price": 120,
    "images": [
      "images/packages/s4_main.jpg",
      "images/packages/s4_1.jpg",
      "images/packages/s4_3.jpg"
    ]
  },
  {
    "id": "s5",
    "name": "ちっぷすたー",
    "kana": "ちっぷすたー",
    "category": "snack",
    "price": 120,
    "images": [
      "images/packages/s5_main.jpg",
      "images/packages/s5_1.jpg",
      "images/packages/s5_3.jpg"
    ]
  },
  {
    "id": "s6",
    "name": "きゃらめるこーん",
    "kana": "きゃらめるこーん",
    "category": "snack",
    "price": 120,
    "images": [
      "images/packages/s6_main.jpg",
      "images/packages/s6_1.jpg",
      "images/packages/s6_3.jpg"
    ]
  },
  {
    "id": "s7",
    "name": "さっぽろぽてと",
    "kana": "さっぽろぽてと",
    "category": "snack",
    "price": 120,
    "images": [
      "images/packages/s7_main.jpg",
      "images/packages/s7_1.jpg",
      "images/packages/s7_2.jpg"
    ]
  },
  {
    "id": "s8",
    "name": "ぴざぽてと",
    "kana": "ぴざぽてと",
    "category": "snack",
    "price": 160,
    "images": [
      "images/packages/s8_main.jpg",
      "images/packages/s8_1.jpg",
      "images/packages/s8_2.jpg"
    ]
  },
  {
    "id": "d1",
    "name": "うまいぼう（こーんぽたーじゅ）",
    "kana": "うまいぼう",
    "category": "dagashi",
    "price": 12,
    "images": [
      "images/packages/d1_main.jpg",
      "images/packages/d1_1.jpg",
      "images/packages/d1_3.jpg"
    ]
  },
  {
    "id": "d2",
    "name": "うまいぼう（めんたい）",
    "kana": "うまいぼうめんたい",
    "category": "dagashi",
    "price": 12,
    "images": [
      "images/packages/d2_main.jpg",
      "images/packages/d2_1.jpg",
      "images/packages/d2_2.jpg"
    ]
  },
  {
    "id": "d3",
    "name": "うまいぼう（ちーず）",
    "kana": "うまいぼうちーず",
    "category": "dagashi",
    "price": 12,
    "images": [
      "images/packages/d3_main.jpg",
      "images/packages/d3_1.jpg",
      "images/packages/d3_2.jpg"
    ]
  },
  {
    "id": "d4",
    "name": "きゃべつたろう",
    "kana": "きゃべつたろう",
    "category": "dagashi",
    "price": 30,
    "images": [
      "images/packages/d4_main.jpg",
      "images/packages/d4_1.jpg",
      "images/packages/d4_2.jpg"
    ]
  },
  {
    "id": "d5",
    "name": "かばやきさんたろう",
    "kana": "かばやきさんたろう",
    "category": "dagashi",
    "price": 15,
    "images": [
      "images/packages/d5_main.jpg",
      "images/packages/d5_1.jpg",
      "images/packages/d5_2.jpg"
    ]
  },
  {
    "id": "d6",
    "name": "よっちゃんいか",
    "kana": "よっちゃんいか",
    "category": "dagashi",
    "price": 50,
    "images": [
      "images/packages/d6_main.jpg",
      "images/packages/d6_2.jpg",
      "images/packages/d6_3.jpg"
    ]
  },
  {
    "id": "d7",
    "name": "べびーすたーらーめん",
    "kana": "べびーすたーらーめん",
    "category": "dagashi",
    "price": 40,
    "images": [
      "images/packages/d7_main.jpg",
      "images/packages/d7_1.jpg",
      "images/packages/d7_3.jpg"
    ]
  },
  {
    "id": "d8",
    "name": "びっぐかつ",
    "kana": "びっぐかつ",
    "category": "dagashi",
    "price": 40,
    "images": [
      "images/packages/d8_main.jpg",
      "images/packages/d8_1.jpg",
      "images/packages/d8_2.jpg"
    ]
  },
  {
    "id": "d9",
    "name": "やったーめん",
    "kana": "やったーめん",
    "category": "dagashi",
    "price": 15,
    "images": [
      "images/packages/d9_main.jpg",
      "images/packages/d9_1.jpg",
      "images/packages/d9_3.jpg"
    ]
  },
  {
    "id": "a1",
    "name": "ちゅっぱちゃぷす",
    "kana": "ちゅっぱちゃぷす",
    "category": "candy",
    "price": 45,
    "images": [
      "images/packages/a1_main.jpg",
      "images/packages/a1_1.jpg",
      "images/packages/a1_3.jpg"
    ]
  },
  {
    "id": "a2",
    "name": "みるきー",
    "kana": "みるきー",
    "category": "candy",
    "price": 120,
    "images": [
      "images/packages/a2_main.jpg",
      "images/packages/a2_1.jpg",
      "images/packages/a2_2.jpg"
    ]
  },
  {
    "id": "a3",
    "name": "はいちゅう",
    "kana": "はいちゅう",
    "category": "candy",
    "price": 110,
    "images": [
      "images/packages/a3_main.jpg",
      "images/packages/a3_1.jpg",
      "images/packages/a3_3.jpg"
    ]
  },
  {
    "id": "a4",
    "name": "ぽっぷきゃんでぃ",
    "kana": "ぽっぷきゃんでぃ",
    "category": "candy",
    "price": 110,
    "images": [
      "images/packages/a4_main.jpg",
      "images/packages/a4_1.jpg",
      "images/packages/a4_2.jpg"
    ]
  },
  {
    "id": "g1",
    "name": "かじゅうぐみ（ぶどう）",
    "kana": "かじゅうぐみ",
    "category": "gummy",
    "price": 120,
    "images": [
      "images/packages/g1_main.jpg",
      "images/packages/g1_1.jpg",
      "images/packages/g1_2.jpg"
    ]
  },
  {
    "id": "g2",
    "name": "ぴゅれぐみ（れもん）",
    "kana": "ぴゅれぐみ",
    "category": "gummy",
    "price": 130,
    "images": [
      "images/packages/g2_main.jpg",
      "images/packages/g2_1.jpg",
      "images/packages/g2_3.jpg"
    ]
  },
  {
    "id": "g3",
    "name": "はりぼー（ごーるどべあ）",
    "kana": "はりぼー",
    "category": "gummy",
    "price": 150,
    "images": [
      "images/packages/g3_main.jpg",
      "images/packages/g3_2.jpg",
      "images/packages/g3_3.jpg"
    ]
  },
  {
    "id": "g4",
    "name": "つぶぐみ",
    "kana": "つぶぐみ",
    "category": "gummy",
    "price": 140,
    "images": [
      "images/packages/g4_main.jpg",
      "images/packages/g4_1.jpg",
      "images/packages/g4_3.jpg"
    ]
  },
  {
    "id": "r1",
    "name": "もりながらむね",
    "kana": "もりながらむね",
    "category": "ramune",
    "price": 80,
    "images": [
      "images/packages/r1_main.jpg",
      "images/packages/r1_2.jpg",
      "images/packages/r1_3.jpg"
    ]
  },
  {
    "id": "r2",
    "name": "よーぐれっと",
    "kana": "よーぐれっと",
    "category": "ramune",
    "price": 130,
    "images": [
      "images/packages/r2_main.jpg",
      "images/packages/r2_2.jpg",
      "images/packages/r2_3.jpg"
    ]
  },
  {
    "id": "r3",
    "name": "はいれもん",
    "kana": "はいれもん",
    "category": "ramune",
    "price": 130,
    "images": [
      "images/packages/r3_main.jpg",
      "images/packages/r3_1.jpg",
      "images/packages/r3_3.jpg"
    ]
  },
  {
    "id": "r4",
    "name": "くっぴーらむね",
    "kana": "くっぴーらむね",
    "category": "ramune",
    "price": 30,
    "images": [
      "images/packages/r4_main.jpg",
      "images/packages/r4_1.jpg",
      "images/packages/r4_3.jpg"
    ]
  },
  {
    "id": "m1",
    "name": "くだものぜりー（みかん）",
    "kana": "ぜりー",
    "category": "jelly",
    "price": 130,
    "images": [
      "images/packages/m1_main.jpg",
      "images/packages/m1_2.jpg",
      "images/packages/m1_3.jpg"
    ]
  },
  {
    "id": "m2",
    "name": "ほわいとましゅまろ",
    "kana": "ましゅまろ",
    "category": "jelly",
    "price": 110,
    "images": [
      "images/packages/m2_main.jpg",
      "images/packages/m2_1.jpg",
      "images/packages/m2_2.jpg"
    ]
  },
  {
    "id": "m3",
    "name": "ぷるんとこんにゃくぜりー",
    "kana": "こんにゃくぜりー",
    "category": "jelly",
    "price": 120,
    "images": [
      "images/packages/m3_main.jpg",
      "images/packages/m3_1.jpg",
      "images/packages/m3_2.jpg"
    ]
  }
];

// きーわーどによる じどう かかく はんてい えんじん
const PRICE_RULES = [
  { match: /ちろる|ぶらっくさんだー|うまいぼう|やったー|どんぐり|かばやき/, price: 20 },
  { match: /だがし|らむね|がむ|もろっこ|きゃべつ|びっぐかつ|よっちゃん/, price: 40 },
  { match: /はいちゅう|ぷっちょ|ましゅまろ|ちゅっぱ|じゅーC/, price: 70 },
  { match: /こあら|べびーすたー|ぽっぷきゃんでぃ|もりながらむね|そふと/, price: 100 },
  { match: /ちょこ|ぐみ|ぽてち|ぽてと|ぽっきー|せんべい|ぜりー|はっぴー|ばかうけ|ゆき/, price: 130 },
  { match: /じゃがりこ|きのこ|たけのこ|ぴざぽてと|はりぼー|ちっぷすたー|きっとかっと/, price: 160 }
];

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
