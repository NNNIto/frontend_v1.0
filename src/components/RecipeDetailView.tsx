import { ArrowLeft, Clock, Star, Bookmark, Users, Flame } from 'lucide-react';
import { Post } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecipeDetailViewProps {
  post: Post;
  onBack: () => void;
  onToggleSave?: (post: Post) => void;
  isSaved?: boolean;
}

export function RecipeDetailView({ post, onBack, onToggleSave, isSaved }: RecipeDetailViewProps) {
  // モック材料データ
  const ingredients = [
    { name: 'パスタ', amount: '200g' },
    { name: 'ベーコン', amount: '100g' },
    { name: '卵', amount: '2個' },
    { name: 'パルメザンチーズ', amount: '50g' },
    { name: '黒胡椒', amount: '適量' },
    { name: 'オリーブオイル', amount: '大さじ2' },
    { name: '塩', amount: '適量' },
  ];

  // モック作り方データ
  const steps = [
    'パスタを茹でるためのお湯を沸かし、塩を加えます。',
    'ベーコンを1cm幅に切り、フライパンでカリカリになるまで炒めます。',
    'ボウルに卵、パルメザンチーズ、黒胡椒を入れてよく混ぜ合わせます。',
    'パスタを表示時間より1分短く茹でます。',
    '茹で上がったパスタをベーコンのフライパンに入れ、火を止めます。',
    '卵液を加えてすばやく混ぜ合わせます。（余熱で卵を固めます）',
    '皿に盛り付け、お好みで黒胡椒とパルメザンチーズをかけて完成です。',
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center mx-4">レシピ詳細</h1>
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(post)}
            className={`p-2 rounded-full ${
              isSaved ? 'text-orange-500' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="pb-20">
        {/* Main Image */}
        <div className="relative w-full aspect-[4/3]">
          <ImageWithFallback
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and Rating */}
        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-xl mb-3">{post.title}</h2>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(Math.floor(post.rating))].map((_, i) => (
                <Star key={`full-${i}`} className="w-5 h-5 fill-orange-400 text-orange-400" />
              ))}
              {post.rating % 1 >= 0.5 && (
                <div className="relative w-5 h-5">
                  <Star className="w-5 h-5 text-orange-400 absolute" />
                  <div className="overflow-hidden w-1/2 absolute">
                    <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                  </div>
                </div>
              )}
              {[...Array(5 - Math.floor(post.rating) - (post.rating % 1 >= 0.5 ? 1 : 0))].map((_, i) => (
                <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
              ))}
              <span className="text-sm text-gray-700 ml-2">{post.rating.toFixed(2)}</span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.timeMinutes}分</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>2人分</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              <span>450kcal</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 py-4 border-b border-gray-200">
          <p className="text-gray-700 text-sm leading-relaxed">{post.description}</p>
        </div>

        {/* Ingredients */}
        <div className="px-4 py-4 border-b border-gray-200">
          <h3 className="mb-3">材料（2人分）</h3>
          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">{ingredient.name}</span>
                <span className="text-gray-600 text-sm">{ingredient.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="px-4 py-4">
          <h3 className="mb-4">作り方</h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
