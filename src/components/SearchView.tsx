import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PostCard } from './PostCard';
import { PostDetailModal } from './PostDetailModal';
import { mockPosts } from '../data/mockPosts';
import * as api from '../api';
import { Post, FilterOptions, Situation, RestaurantGenre, Priority, ShopPreference, RecipeCategory, RecipeGenre, RecipePreference } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star } from 'lucide-react';

// 外食用オプション
const situationOptions: { value: Situation; label: string }[] = [
  { value: 'date', label: 'デート' },
  { value: 'family', label: '子連れ' },
  { value: 'senior', label: 'シニア' },
  { value: 'lunch', label: 'ランチ' },
  { value: 'dinner', label: 'ディナー' },
];

const restaurantGenreOptions: { value: RestaurantGenre; label: string }[] = [
  { value: 'cafe', label: 'カフェ' },
  { value: 'korean', label: '韓国' },
  { value: 'chinese', label: '中華' },
  { value: 'ramen', label: 'ラーメン' },
];

const priorityOptions: { value: Priority; label: string }[] = [
  { value: 'chewyNoodles', label: '麺もちもち' },
  { value: 'richFlavor', label: '味が濃い' },
  { value: 'spicy', label: 'スパイシー' },
];

const shopPreferenceOptions: { value: ShopPreference; label: string }[] = [
  { value: 'relaxing', label: 'ゆったり' },
  { value: 'kidFriendly', label: '子供向け' },
  { value: 'hawaii', label: 'ハワイ' },
];

// レシピ用オプション
const recipeCategoryOptions: { value: RecipeCategory; label: string }[] = [
  { value: 'breakfast', label: '朝ごはん' },
  { value: 'lunch', label: '昼ごはん' },
  { value: 'dinner', label: '夜ごはん' },
  { value: 'snack', label: 'おやつ' },
];

const recipeGenreOptions: { value: RecipeGenre; label: string }[] = [
  { value: 'japanese', label: '和食' },
  { value: 'western', label: '洋食' },
  { value: 'chinese', label: '中華' },
  { value: 'italian', label: 'イタリアン' },
];

const recipePreferenceOptions: { value: RecipePreference; label: string }[] = [
  { value: 'lemon', label: 'レモン' },
  { value: 'summerVegetables', label: '夏野菜' },
  { value: 'curry', label: 'カレー' },
];

// 場所オプション
const locationOptions = [
  { value: '丸の内', label: '丸の内' },
  { value: '麻布', label: '麻布' },
  { value: 'ソラマチ', label: 'ソラマチ' },
];

export function SearchView({ 
  onEditToPlan,
  onRestaurantClick,
  onRecipeClick,
  onToggleSave,
  isPostSaved
}: { 
  onEditToPlan?: (title: string) => void;
  onRestaurantClick?: (post: Post) => void;
  onRecipeClick?: (post: Post) => void;
  onToggleSave?: (post: Post) => void;
  isPostSaved?: (postId: string) => boolean;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    situation: [],
    genre: [],
    priority: [],
    shopPreference: [],
    category: [],
    recipeGenre: [],
    recipePreference: [],
    maxTime: 120,
    maxBudget: 10000,
    searchQuery: '',
    location: '', // 場所フィルター初期化
  });
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const fetched = await api.getPosts();
      if (!mounted) return;
      if (Array.isArray(fetched) && fetched.length > 0) {
        setPosts(fetched as Post[]);
      }
    })();
    return () => { mounted = false };
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const toggleSituation = (situation: Situation) => {
    setFilters({
      ...filters,
      situation: filters.situation.includes(situation)
        ? filters.situation.filter(s => s !== situation)
        : [...filters.situation, situation],
    });
  };

  const toggleGenre = (genre: RestaurantGenre) => {
    setFilters({
      ...filters,
      genre: filters.genre.includes(genre)
        ? filters.genre.filter(g => g !== genre)
        : [...filters.genre, genre],
    });
  };

  const togglePriority = (priority: Priority) => {
    setFilters({
      ...filters,
      priority: filters.priority.includes(priority)
        ? filters.priority.filter(p => p !== priority)
        : [...filters.priority, priority],
    });
  };

  const toggleShopPreference = (pref: ShopPreference) => {
    setFilters({
      ...filters,
      shopPreference: filters.shopPreference.includes(pref)
        ? filters.shopPreference.filter(p => p !== pref)
        : [...filters.shopPreference, pref],
    });
  };

  const toggleCategory = (category: RecipeCategory) => {
    setFilters({
      ...filters,
      category: filters.category.includes(category)
        ? filters.category.filter(c => c !== category)
        : [...filters.category, category],
    });
  };

  const toggleRecipeGenre = (genre: RecipeGenre) => {
    setFilters({
      ...filters,
      recipeGenre: filters.recipeGenre.includes(genre)
        ? filters.recipeGenre.filter(g => g !== genre)
        : [...filters.recipeGenre, genre],
    });
  };

  const toggleRecipePreference = (pref: RecipePreference) => {
    setFilters({
      ...filters,
      recipePreference: filters.recipePreference.includes(pref)
        ? filters.recipePreference.filter(p => p !== pref)
        : [...filters.recipePreference, pref],
    });
  };

  const applyFilters = () => {
    let filtered = [...mockPosts];

    if (filters.type !== 'all') {
      filtered = filtered.filter(post => post.type === filters.type);
    }

    // 外食用フィルター
    if (filters.situation.length > 0) {
      filtered = filtered.filter(post =>
        post.situation?.some(s => filters.situation.includes(s))
      );
    }

    if (filters.genre.length > 0) {
      filtered = filtered.filter(post =>
        post.genre?.some(g => filters.genre.includes(g as RestaurantGenre))
      );
    }

    if (filters.priority.length > 0) {
      filtered = filtered.filter(post =>
        post.priority?.some(p => filters.priority.includes(p))
      );
    }

    if (filters.shopPreference.length > 0) {
      filtered = filtered.filter(post =>
        post.shopPreference?.some(p => filters.shopPreference.includes(p))
      );
    }

    // レシピ用フィルター
    if (filters.category.length > 0) {
      filtered = filtered.filter(post =>
        post.category?.some(c => filters.category.includes(c))
      );
    }

    if (filters.recipeGenre.length > 0) {
      filtered = filtered.filter(post =>
        post.recipeGenre?.some(g => filters.recipeGenre.includes(g))
      );
    }

    if (filters.recipePreference.length > 0) {
      filtered = filtered.filter(post =>
        post.recipePreference?.some(p => filters.recipePreference.includes(p))
      );
    }

    // 時間・手間フィルター（レシピのみ）
    if (filters.type === 'recipe') {
      filtered = filtered.filter(post => post.timeMinutes <= filters.maxTime);
    }

    // 予算フィルター
    filtered = filtered.filter(post => post.budget <= filters.maxBudget);

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setPosts(filtered);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="sticky top-[57px] bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="料理名、タグで検索..."
              value={filters.searchQuery}
              onChange={(e) => {
                setFilters({ ...filters, searchQuery: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyFilters();
                }
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full ${
              showFilters ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-4">
          {/* Type Filter */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">種類</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({ ...filters, type: 'all' })}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.type === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                すべて
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: 'recipe' })}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.type === 'recipe'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                レシピ
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: 'restaurant' })}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.type === 'restaurant'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                外食
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: 'foodWalk' })}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.type === 'foodWalk'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                食べ歩き
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: 'sightseeing' })}
                className={`px-4 py-2 rounded-full text-sm ${
                  filters.type === 'sightseeing'
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                観光
              </button>
            </div>
          </div>

          {/* レシピ用フィルター */}
          {filters.type === 'recipe' && (
            <>
              {/* Category Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">カテゴリ</label>
                <div className="flex flex-wrap gap-2">
                  {recipeCategoryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleCategory(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.category.includes(option.value)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Genre Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">ジャンル</label>
                <div className="flex flex-wrap gap-2">
                  {recipeGenreOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleRecipeGenre(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.recipeGenre.includes(option.value)
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Preference Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">こだわり</label>
                <div className="flex flex-wrap gap-2">
                  {recipePreferenceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleRecipePreference(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.recipePreference.includes(option.value)
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Filter (Recipe Only) */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">
                  時間・手間: {filters.maxTime}分以内
                </label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={filters.maxTime}
                  onChange={(e) =>
                    setFilters({ ...filters, maxTime: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </>
          )}

          {/* すべて用フィルター（レシピ + 外食のすべて） */}
          {filters.type === 'all' && (
            <>
              {/* Recipe Category Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">カテゴリ</label>
                <div className="flex flex-wrap gap-2">
                  {recipeCategoryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleCategory(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.category.includes(option.value)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Situation Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">シチュエーション</label>
                <div className="flex flex-wrap gap-2">
                  {situationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleSituation(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.situation.includes(option.value)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Genre Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">レシピジャンル</label>
                <div className="flex flex-wrap gap-2">
                  {recipeGenreOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleRecipeGenre(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.recipeGenre.includes(option.value)
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Restaurant Genre Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">外食ジャンル</label>
                <div className="flex flex-wrap gap-2">
                  {restaurantGenreOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleGenre(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.genre.includes(option.value)
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Preference Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">レシピこだわり</label>
                <div className="flex flex-wrap gap-2">
                  {recipePreferenceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleRecipePreference(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.recipePreference.includes(option.value)
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">料理のこだわり</label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => togglePriority(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.priority.includes(option.value)
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop Preference Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">店のこだわり</label>
                <div className="flex flex-wrap gap-2">
                  {shopPreferenceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleShopPreference(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.shopPreference.includes(option.value)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">
                  時間・手間: {filters.maxTime}分以内
                </label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={filters.maxTime}
                  onChange={(e) =>
                    setFilters({ ...filters, maxTime: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </>
          )}

          {/* 外食用フィルター */}
          {filters.type === 'restaurant' && (
            <>
              {/* Situation Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">シチュエーション</label>
                <div className="flex flex-wrap gap-2">
                  {situationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleSituation(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.situation.includes(option.value)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Restaurant Genre Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">ジャンル</label>
                <div className="flex flex-wrap gap-2">
                  {restaurantGenreOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleGenre(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.genre.includes(option.value)
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">料理のこだわり</label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => togglePriority(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.priority.includes(option.value)
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop Preference Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">店のこだわり</label>
                <div className="flex flex-wrap gap-2">
                  {shopPreferenceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleShopPreference(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.shopPreference.includes(option.value)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 食べ歩き・観光用フィルター */}
          {(filters.type === 'foodWalk' || filters.type === 'sightseeing') && (
            <>
              {/* Situation Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">シチュエーション</label>
                <div className="flex flex-wrap gap-2">
                  {situationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleSituation(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.situation.includes(option.value)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Restaurant Genre Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">ジャンル</label>
                <div className="flex flex-wrap gap-2">
                  {restaurantGenreOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleGenre(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.genre.includes(option.value)
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">料理のこだわり</label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => togglePriority(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.priority.includes(option.value)
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop Preference Filter */}
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">店のこだわり</label>
                <div className="flex flex-wrap gap-2">
                  {shopPreferenceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleShopPreference(option.value)}
                      className={`px-3 py-2 rounded-full text-sm ${
                        filters.shopPreference.includes(option.value)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Budget Filter */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">
              予算: ¥{filters.maxBudget.toLocaleString()}以内
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={filters.maxBudget}
              onChange={(e) =>
                setFilters({ ...filters, maxBudget: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">場所</label>
            <div className="flex gap-2">
              {locationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters({ ...filters, location: filters.location === option.value ? '' : option.value })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    filters.location === option.value
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            フィルターを適用
          </button>
        </div>
      )}

      {/* Posts */}
      <div className="pb-20 px-4 pt-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            条件に合う投稿が見つかりませんでした
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handlePostClick(post)}
              >
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onEditToPlan={onEditToPlan}
          onRestaurantClick={onRestaurantClick}
          onRecipeClick={onRecipeClick}
          onToggleSave={onToggleSave}
          isSaved={isPostSaved ? isPostSaved(selectedPost.id) : false}
        />
      )}
    </div>
  );
}