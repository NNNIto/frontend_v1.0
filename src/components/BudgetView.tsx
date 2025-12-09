import { useState, useEffect } from 'react';
import { DollarSign, Users, Flame, MapPin, CalendarCheck, Search, TrendingUp, Store, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BudgetViewProps {
  initialSearchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

interface RestaurantOrder {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  items: { name: string; price: number; imageUrl: string }[];
  totalCalories: number;
  totalPrice: number;
}

interface RecipeOrder {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  items: { 
    name: string; 
    quantity: string; 
    price: number;
    alternatives?: { name: string; price: number; reason: string }[];
  }[];
  totalCalories: number;
  totalPrice: number;
}

export function BudgetView({ initialSearchQuery = '', onSearchQueryChange }: BudgetViewProps) {
  const [budget, setBudget] = useState(1500);
  const [calories, setCalories] = useState(600);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [customPreference, setCustomPreference] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedType, setSelectedType] = useState<'all' | 'recipe' | 'restaurant'>('all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [restaurantOrders, setRestaurantOrders] = useState<RestaurantOrder[]>([]);
  const [recipeOrders, setRecipeOrders] = useState<RecipeOrder[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // ON/OFF state for each filter
  const [budgetEnabled, setBudgetEnabled] = useState(true);
  const [caloriesEnabled, setCaloriesEnabled] = useState(true);
  const [preferencesEnabled, setPreferencesEnabled] = useState(true);
  const [peopleCountEnabled, setPeopleCountEnabled] = useState(true);

  // Trigger search when initialSearchQuery changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      // Auto-trigger search after a brief delay to let the UI update
      setTimeout(() => {
        handleSearch();
      }, 100);
    }
  }, [initialSearchQuery]);

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    }
  };

  const togglePreference = (pref: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleSearch = () => {
    setShowResults(true);

    if (selectedType === 'restaurant' || selectedType === 'all') {
      // Generate restaurant order suggestions with specific menu items and images
      const orders: RestaurantOrder[] = [
        {
          id: '1',
          title: 'バランス重視セット',
          description: '栄養バランスを考えた定番の組み合わせ',
          imageUrl: 'https://images.unsplash.com/photo-1707528903668-bf2ce55b2e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMG5vb2RsZXMlMjByZXN0YXıyYW50fGVufDF8fHx8MTc2NDU3NDEwNnww&ixlib=rb-4.1.0&q=80&w=1080',
          items: [
            { name: '豚骨ラーメン', price: 900, imageUrl: 'https://images.unsplash.com/photo-1707528903668-bf2ce55b2e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMG5vb2RsZXMlMjByZXN0YXıyYW50fGVufDF8fHx8MTc2NDU3NDEwNnww&ixlib=rb-4.1.0&q=80&w=1080' },
            { name: '餃子（6個）', price: 300, imageUrl: 'https://images.unsplash.com/photo-1703080173985-936514c7c8bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW96YSUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3NjQ1ODM0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
            { name: 'ウーロン茶', price: 150, imageUrl: 'https://images.unsplash.com/photo-1644413579461-b6ac1611caa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvb2xvbmclMjB0ZWElMjBkcmlua3xlbnwxfHx8fDE3NjQ2MzEzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
          ],
          totalCalories: Math.floor(calories * 0.9),
          totalPrice: 1350,
        },
        {
          id: '2',
          title: 'ヘルシー軽めセット',
          description: 'カロリー控えめで満足感のある組み合わせ',
          imageUrl: 'https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2NDU2MjYyNHww&ixlib=rb-4.1.0&q=80&w=1080',
          items: [
            { name: 'サラダチキンプレート', price: 780, imageUrl: 'https://images.unsplash.com/photo-1663861623497-2151b2bb21fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHBsYXRlfGVufDF8fHx8MTc2NDUwOTM1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
            { name: 'ミネストローネスープ', price: 320, imageUrl: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lc3Ryb25lJTIwc291cHxlbnwxfHx8fDE3NjQ1NTEzODN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
            { name: '野菜サラダ', price: 280, imageUrl: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc2NDU0NjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
          ],
          totalCalories: Math.floor(calories * 0.7),
          totalPrice: 1380,
        },
        {
          id: '3',
          title: 'ボリューム満点セット',
          description: 'しっかり食べたい方向けの満足コース',
          imageUrl: 'https://images.unsplash.com/photo-1745427023135-5250e409ae86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBzdGVhackUyMG1lYWx8ZW58MXx8fHwxNzY0NjMwODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
          items: [
            { name: 'チーズハンバーグ定食', price: 1080, imageUrl: 'https://images.unsplash.com/photo-1745427023135-5250e409ae86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1idXJnZXIlMjBzdGVhackUyMG1lYWx8ZW58MXx8fHwxNzY0NjMwODI5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
            { name: 'から揚げ（3個）', price: 380, imageUrl: 'https://images.unsplash.com/photo-1705359573945-bcf2d0b70b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBrYXJhYWdlfGVufDF8fHx8MTc2NDYzMTM3OHww&ixlib=rb-4.1.0&q=80&w=1080' },
            { name: 'アイスコーヒー', price: 200, imageUrl: 'https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzY0NTUyMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
          ],
          totalCalories: Math.floor(calories * 1.1),
          totalPrice: 1660,
        },
      ];
      setRestaurantOrders(orders);
    }

    if (selectedType === 'recipe' || selectedType === 'all') {
      // Generate recipe order suggestions with shopping list, alternatives, and images
      const recipeOrdersList: RecipeOrder[] = [
        {
          id: '1',
          title: 'カルボナーラの買い出しリスト',
          description: '本格的なカルボナーラを作るための材料',
          imageUrl: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NjQ1NjAyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          items: [
            { 
              name: 'スパゲッティ', 
              quantity: '200g', 
              price: 150,
              alternatives: [
                { name: '生パスタ', price: 200, reason: '茹で時間が半分、食感がもちもち' },
              ]
            },
            { 
              name: 'ベーコン', 
              quantity: '80g', 
              price: 180,
              alternatives: [
                { name: 'パンチェッタ', price: 250, reason: '本格的なイタリア風味' },
              ]
            },
            { name: '卵', quantity: '2個', price: 80 },
            { 
              name: '粉チーズ', 
              quantity: '30g', 
              price: 120,
              alternatives: [
                { name: 'パルメザンチーズ', price: 350, reason: '風味が格段に良い' },
              ]
            },
            { name: 'にんにく', quantity: '1片', price: 50 },
          ],
          totalCalories: Math.floor(calories * 0.85),
          totalPrice: 580,
        },
        {
          id: '2',
          title: 'ヘルシーサラダボウル',
          description: '栄養満点のサラダボウルの材料',
          imageUrl: 'https://images.unsplash.com/photo-1578657084274-03b9d153b0dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGJvd2wlMjBhdm9jYWRvfGVufDF8fHx8MTc2NDYzMDgyOXww&ixlib=rb-4.1.0&q=80&w=1080',
          items: [
            { 
              name: 'サラダチキン', 
              quantity: '1パック', 
              price: 200,
              alternatives: [
                { name: '蒸し鶏', price: 180, reason: 'より自然な味わい、添加物少ない' },
                { name: 'ツナ缶', price: 120, reason: 'コスト半分、保存がきく' },
              ]
            },
            { 
              name: 'アボカド', 
              quantity: '1個', 
              price: 180,
              alternatives: [
                { name: 'きゅうり', price: 45, reason: '価格1/4、食感は類似' },
              ]
            },
            { name: 'ミニトマト', quantity: '1パック', price: 120 },
            { 
              name: 'レタス', 
              quantity: '1/2玉', 
              price: 80,
              alternatives: [
                { name: 'カット野菜', price: 150, reason: '下処理不要で時短' },
              ]
            },
            { name: 'オリーブオイル', quantity: '適量', price: 30 },
          ],
          totalCalories: Math.floor(calories * 0.65),
          totalPrice: 610,
        },
        {
          id: '3',
          title: 'チキンカレーの買い出しリスト',
          description: 'スパイスの効いた本格カレーの材料',
          imageUrl: 'https://images.unsplash.com/photo-1707448829764-9474458021ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJyeSUyMGNoaWNrZW4lMjByaWNlfGVufDF8fHx8MTc2NDYzMDgzMHww&ixlib=rb-4.1.0&q=80&w=1080',
          items: [
            { 
              name: '鶏もも肉', 
              quantity: '300g', 
              price: 420,
              alternatives: [
                { name: '鶏むね肉', price: 280, reason: 'カロリー30%減、高タンパク' },
                { name: 'サラダチキン', price: 300, reason: '加熱済みで時短' },
              ]
            },
            { name: '玉ねぎ', quantity: '2個', price: 100 },
            { name: 'じゃがいも', quantity: '2個', price: 80 },
            { name: 'にんじん', quantity: '1本', price: 60 },
            { 
              name: 'カレールー', 
              quantity: '1/2箱', 
              price: 120,
              alternatives: [
                { name: 'カレー粉＋トマト缶', price: 200, reason: '添加物なしで本格的' },
              ]
            },
          ],
          totalCalories: Math.floor(calories * 1.0),
          totalPrice: 780,
        },
      ];
      setRecipeOrders(recipeOrdersList);
    }
  };

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1 flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-orange-500" />
          <span>プランを立てる</span>
        </h2>
        <p className="text-gray-600 text-xs">
          条件を設定してあなたにぴったりの提案を見つけましょう
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="料理名・店名で検索"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Compact Settings Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Budget Input */}
        <div className={`bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl transition-all ${
          budgetEnabled ? 'p-3' : 'p-2'
        }`}>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-700 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-orange-500" />
              予算
            </label>
            <button
              onClick={() => setBudgetEnabled(!budgetEnabled)}
              className={`px-3 py-0.5 rounded-full text-xs transition-colors ${
                budgetEnabled
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {budgetEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          {budgetEnabled && (
            <>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                step="100"
                className="w-full px-2 py-1 text-lg border border-orange-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 mb-2 mt-2"
                placeholder="1500"
              />
              <div className="flex gap-1 flex-wrap">
                {[500, 1000, 1500, 2000, 3000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBudget(amount)}
                    className="px-2 py-1 bg-white text-gray-700 rounded text-xs hover:bg-orange-100 transition-colors border border-orange-200"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Calories Input */}
        <div className={`bg-gradient-to-br from-red-50 to-orange-50 rounded-xl transition-all ${
          caloriesEnabled ? 'p-3' : 'p-2'
        }`}>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-700 flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              カロリー
            </label>
            <button
              onClick={() => setCaloriesEnabled(!caloriesEnabled)}
              className={`px-3 py-0.5 rounded-full text-xs transition-colors ${
                caloriesEnabled
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {caloriesEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          {caloriesEnabled && (
            <>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(parseInt(e.target.value) || 0)}
                step="50"
                className="w-full px-2 py-1 text-lg border border-red-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 mb-2 mt-2"
                placeholder="600"
              />
              <div className="flex gap-1 flex-wrap">
                {[400, 500, 600, 700, 800].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCalories(amount)}
                    className="px-2 py-1 bg-white text-gray-700 rounded text-xs hover:bg-red-100 transition-colors border border-red-200"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Preferences Input */}
        <div className={`bg-gradient-to-br from-green-50 to-teal-50 rounded-xl transition-all ${
          preferencesEnabled ? 'p-3' : 'p-2'
        }`}>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-700">志向</label>
            <button
              onClick={() => setPreferencesEnabled(!preferencesEnabled)}
              className={`px-3 py-0.5 rounded-full text-xs transition-colors ${
                preferencesEnabled
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {preferencesEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          {preferencesEnabled && (
            <>
              <div className="flex gap-1 flex-wrap mb-2 mt-2">
                {['糖質オフ', 'グルテンフリー', '高タンパク', '野菜中心', '赤身肉', '貧血予防'].map((pref) => (
                  <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`px-2 py-1 rounded-full text-xs transition-colors ${
                      selectedPreferences.includes(pref)
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 border border-green-200 hover:bg-green-100'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={customPreference}
                onChange={(e) => setCustomPreference(e.target.value)}
                placeholder="その他の志向"
                className="w-full px-2 py-1 text-xs border border-green-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </>
          )}
        </div>

        {/* People Count Input */}
        <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl transition-all ${
          peopleCountEnabled ? 'p-3' : 'p-2'
        }`}>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-700 flex items-center gap-1">
              <Users className="w-3 h-3 text-blue-500" />
              人数
            </label>
            <button
              onClick={() => setPeopleCountEnabled(!peopleCountEnabled)}
              className={`px-3 py-0.5 rounded-full text-xs transition-colors ${
                peopleCountEnabled
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {peopleCountEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          {peopleCountEnabled && (
            <>
              <input
                type="number"
                value={peopleCount}
                onChange={(e) => setPeopleCount(parseInt(e.target.value) || 1)}
                min="1"
                className="w-full px-2 py-1 text-lg border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2 mt-2"
                placeholder="1"
              />
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    onClick={() => setPeopleCount(count)}
                    className="px-2 py-1 bg-white text-gray-700 rounded text-xs hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    {count}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 mb-4"
      >
        <TrendingUp className="w-5 h-5" />
        <span>提案を見る</span>
      </button>

      {/* Results */}
      {showResults && (
        <div className="space-y-6">
          {/* Restaurant Order Suggestions */}
          {(selectedType === 'restaurant' || selectedType === 'all') && restaurantOrders.length > 0 && (
            <div>
              <h3 className="mb-4 flex items-center gap-2">
                <Store className="w-5 h-5 text-blue-500" />
                <span>外食での注文例</span>
              </h3>
              <div className="space-y-4">
                {restaurantOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-blue-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-blue-600 mb-2">{order.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{order.description}</p>
                      
                      {/* Menu Items with Horizontal Scroll */}
                      <div className="mb-3">
                        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex-shrink-0 w-32">
                              <div className="relative w-32 h-24 rounded-lg overflow-hidden mb-2">
                                <ImageWithFallback
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="text-xs text-gray-700 mb-1">{item.name}</p>
                              <p className="text-xs text-orange-600">¥{item.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Flame className="w-4 h-4 text-red-500" />
                          <span>{order.totalCalories}kcal</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <span>合計: ¥{order.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipe Order Suggestions */}
          {(selectedType === 'recipe' || selectedType === 'all') && recipeOrders.length > 0 && (
            <div>
              <h3 className="mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-green-500" />
                <span>レシピの買い出しリスト</span>
              </h3>
              <div className="space-y-4">
                {recipeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-green-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative w-full h-48">
                      <ImageWithFallback
                        src={order.imageUrl}
                        alt={order.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-green-600 mb-2">{order.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{order.description}</p>
                      <div className="space-y-3 mb-3">
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <span className="text-green-500">•</span>
                                <span>{item.name}</span>
                                <span className="text-xs text-gray-500">({item.quantity})</span>
                              </span>
                              <span className="text-gray-700">¥{item.price}</span>
                            </div>
                            {/* Alternatives */}
                            {item.alternatives && item.alternatives.length > 0 && (
                              <div className="ml-6 mt-1 space-y-1">
                                {item.alternatives.map((alt, altIdx) => (
                                  <div key={altIdx} className="bg-purple-50 rounded p-2">
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="flex items-center gap-1">
                                        <span className="text-purple-500">→</span>
                                        <span className="text-purple-700">{alt.name}</span>
                                      </span>
                                      <span className="text-purple-600">¥{alt.price}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 ml-3 mt-0.5">{alt.reason}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200 mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Flame className="w-4 h-4 text-red-500" />
                          <span>{order.totalCalories}kcal</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <span>合計: ¥{order.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`「${order.title.replace('の買い出しリスト', '')}」のレシピを表示（実際のアプリでは詳細レシピ画面に遷移します）`)}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>レシピを見る</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!showResults && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500">
            {searchQuery ? '条件を設定して「提案を見る」をタップ' : '料理名や店名を入力して「提案を見る」をタップ'}
          </p>
        </div>
      )}
    </div>
  );
}