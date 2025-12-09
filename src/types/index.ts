export type PostType = 'recipe' | 'restaurant' | 'foodWalk' | 'sightseeing';

// 外食用
export type Situation = 'date' | 'family' | 'senior' | 'lunch' | 'dinner';
export type RestaurantGenre = 'cafe' | 'korean' | 'chinese' | 'ramen';
export type Priority = 'chewyNoodles' | 'richFlavor' | 'spicy';
export type ShopPreference = 'relaxing' | 'kidFriendly' | 'hawaii';

// レシピ用
export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type RecipeGenre = 'japanese' | 'western' | 'chinese' | 'italian';
export type RecipePreference = 'lemon' | 'summerVegetables' | 'curry';

// 統合型
export type Genre = RestaurantGenre | RecipeGenre;
export type Preference = Priority | ShopPreference | RecipePreference;

export interface Post {
  id: string;
  type: PostType;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  rating: number; // 評価（0.00 ~ 5.00）
  isExpert?: boolean; // 「通」ステータス
  expertLevel?: number; // 「通」レベル（1-10など）
  // 外食用
  situation?: Situation[];
  genre?: Genre[];
  priority?: Priority[];
  shopPreference?: ShopPreference[];
  // レシピ用
  category?: RecipeCategory[];
  recipeGenre?: RecipeGenre[];
  recipePreference?: RecipePreference[];
  // 共通
  timeMinutes: number;
  budget: number;
  location?: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: Date;
  isLiked?: boolean;
  // レポート形式のフィールド
  reportDetails?: {
    // レストランの場合
    dishDetails?: { label: string; value: string }[]; // 例: 麺、ソース等
    prosPoints?: string[]; // 推しポイント
    consPoints?: string[]; // 推せないポイント
    // レシピの場合
    ingredients?: { label: string; value: string }[];
    cookingTips?: string[];
    difficulty?: string;
  };
}

export interface FilterOptions {
  type: PostType | 'all';
  // 外食用
  situation: Situation[];
  genre: Genre[];
  priority: Priority[];
  shopPreference: ShopPreference[];
  // レシピ用
  category: RecipeCategory[];
  recipeGenre: RecipeGenre[];
  recipePreference: RecipePreference[];
  // 共通
  maxTime: number;
  maxBudget: number;
  searchQuery: string;
  location: string; // 場所フィルター追加
}

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface ShoppingItem {
  name: string;
  price: number;
  quantity: string;
  category: string;
}

export interface BudgetSuggestion {
  id: string;
  type: PostType;
  title: string;
  totalBudget: number;
  items: MenuItem[] | ShoppingItem[];
  imageUrl: string;
  location?: string;
  tips: string;
}