import { BudgetSuggestion } from '../types';

export const mockBudgetSuggestions: BudgetSuggestion[] = [
  // Restaurant suggestions
  {
    id: 'r1',
    type: 'restaurant',
    title: '麺屋 幸せ - 豚骨ラーメンセット',
    totalBudget: 1200,
    items: [
      {
        name: '特製豚骨ラーメン',
        price: 900,
        description: '濃厚スープが自慢の一杯',
        category: 'メイン',
      },
      {
        name: '餃子（6個）',
        price: 300,
        description: 'パリッとジューシー',
        category: 'サイド',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1697652974652-a2336106043b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKYXBhbmVzZSUyMHJhbWVuJTIwYm93bHxlbnwxfHx8fDE3NjQ1NjI2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '東京都渋谷区',
    tips: 'ランチタイムは大盛り無料サービスあり！',
  },
  {
    id: 'r2',
    type: 'restaurant',
    title: 'カフェ ムーン - ティータイムセット',
    totalBudget: 1500,
    items: [
      {
        name: 'ティラミス',
        price: 800,
        description: 'ふわふわの自家製ティラミス',
        category: 'デザート',
      },
      {
        name: 'カフェラテ',
        price: 700,
        description: 'バリスタが淹れる本格ラテ',
        category: 'ドリンク',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1662500663022-f556e149a5ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NjQ1NjI2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: '東京都港区表参道',
    tips: 'Wi-Fi完備でゆっくり過ごせます',
  },
  {
    id: 'r3',
    type: 'restaurant',
    title: '韓国食堂 ソウル - ランチセット',
    totalBudget: 1800,
    items: [
      {
        name: 'プルコギ定食',
        price: 1200,
        description: '甘辛いタレが食欲そそる',
        category: 'メイン',
      },
      {
        name: 'チヂミ（ハーフ）',
        price: 400,
        description: 'もちもち食感',
        category: 'サイド',
      },
      {
        name: 'マッコリ（グラス）',
        price: 200,
        description: 'お食事と相性抜群',
        category: 'ドリンク',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kfGVufDF8fHx8MTczMzA3NDYyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    location: '東京都新大久保',
    tips: 'ランチタイムはキムチ食べ放題！',
  },
  
  // Recipe suggestions
  {
    id: 'rec1',
    type: 'recipe',
    title: '簡単カルボナーラの材料',
    totalBudget: 500,
    items: [
      {
        name: 'スパゲッティ',
        price: 150,
        quantity: '200g',
        category: '麺類',
      },
      {
        name: 'ベーコン',
        price: 120,
        quantity: '80g',
        category: '肉類',
      },
      {
        name: '卵',
        price: 80,
        quantity: '2個',
        category: '卵・乳製品',
      },
      {
        name: '粉チーズ',
        price: 100,
        quantity: '30g',
        category: '調味料',
      },
      {
        name: 'にんにく',
        price: 50,
        quantity: '1片',
        category: '野菜',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1739417083034-4e9118f487be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJdGFsaWFuJTIwcGFzdGElMjBkaXNofGVufDF8fHx8MTc2NDU2MjYyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    tips: '調理時間20分！生クリーム不要で簡単に作れます',
  },
  {
    id: 'rec2',
    type: 'recipe',
    title: 'ヘルシーサラダボウルの材料',
    totalBudget: 600,
    items: [
      {
        name: 'アボカド',
        price: 180,
        quantity: '1個',
        category: '野菜',
      },
      {
        name: 'サラダチキン',
        price: 200,
        quantity: '1パック',
        category: '肉類',
      },
      {
        name: 'ミニトマト',
        price: 120,
        quantity: '1パック',
        category: '野菜',
      },
      {
        name: 'レタス',
        price: 80,
        quantity: '1/2玉',
        category: '野菜',
      },
      {
        name: 'オリーブオイル',
        price: 20,
        quantity: '大さじ1',
        category: '調味料',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2NDU2MjYyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    tips: '調理時間15分！栄養満点で満腹感もあります',
  },
  {
    id: 'rec3',
    type: 'recipe',
    title: '手作りハンバーガーの材料',
    totalBudget: 400,
    items: [
      {
        name: 'バンズ',
        price: 100,
        quantity: '2個',
        category: 'パン類',
      },
      {
        name: '牛ひき肉',
        price: 150,
        quantity: '150g',
        category: '肉類',
      },
      {
        name: 'レタス',
        price: 40,
        quantity: '2枚',
        category: '野菜',
      },
      {
        name: 'トマト',
        price: 60,
        quantity: '1/2個',
        category: '野菜',
      },
      {
        name: 'チーズ',
        price: 50,
        quantity: '2枚',
        category: '卵・乳製品',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllc3xlbnwxfHx8fDE3NjQ1NjI0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tips: '調理時間15分！子供も大喜びの手作りバーガー',
  },
];
