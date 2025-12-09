import { Bookmark, Star } from 'lucide-react';
import { Post } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SavedViewProps {
  savedPosts: Post[];
  onPostClick: (post: Post) => void;
  onRecipeClick?: (post: Post) => void;
  onToggleSave: (post: Post) => void;
}

// 星評価表示コンポーネント
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 fill-orange-400 text-orange-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-3 h-3">
          <Star className="w-3 h-3 text-orange-400 absolute" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      ))}
    </div>
  );
}

export function SavedView({ savedPosts, onPostClick, onRecipeClick, onToggleSave }: SavedViewProps) {
  return (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl text-gray-900 mb-2">保存した投稿</h2>
        <p className="text-sm text-gray-600">
          {savedPosts.length}件の投稿を保存中
        </p>
      </div>

      {/* Saved Posts List */}
      {savedPosts.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">まだ保存した投稿がありません</p>
          <p className="text-sm text-gray-400">
            お気に入りの投稿を保存して、<br />
            いつでも簡単にアクセスしましょう
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedPosts.map((post) => {
            const restaurantName = post.title.split(' - ')[0];
            const dishName = post.title.split(' - ')[1] || '';

            return (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3 p-3">
                  {/* Image */}
                  <div
                    className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => {
                      if (post.type === 'recipe' && onRecipeClick) {
                        onRecipeClick(post);
                      } else {
                        onPostClick(post);
                      }
                    }}
                  >
                    <ImageWithFallback
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Type Badge */}
                    <div className="absolute top-1 left-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          post.type === 'recipe'
                            ? 'bg-green-500 text-white'
                            : post.type === 'restaurant'
                            ? 'bg-blue-500 text-white'
                            : post.type === 'foodWalk'
                            ? 'bg-purple-500 text-white'
                            : 'bg-pink-500 text-white'
                        }`}
                      >
                        {post.type === 'recipe' ? 'レシピ' : 
                         post.type === 'restaurant' ? '外食' : 
                         post.type === 'foodWalk' ? '食べ歩き' : '観光'}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-gray-900 mb-1 cursor-pointer hover:text-orange-500 transition-colors line-clamp-1"
                      onClick={() => onPostClick(post)}
                    >
                      {restaurantName}
                    </h3>
                    {dishName && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                        {dishName}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={post.rating} />
                      <span className="text-sm text-gray-700">{post.rating.toFixed(2)}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.genre?.slice(0, 2).map((g, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {g === 'cafe' ? 'カフェ' :
                           g === 'korean' ? '韓国料理' :
                           g === 'chinese' ? '中華料理' :
                           g === 'ramen' ? 'ラーメン' : g}
                        </span>
                      ))}
                      {post.location && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {post.location}
                        </span>
                      )}
                    </div>

                    {/* Budget */}
                    <p className="text-xs text-gray-500">
                      予算: ¥{post.budget.toLocaleString()}
                    </p>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(post);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors self-start"
                  >
                    <Bookmark className="w-5 h-5 fill-orange-500 text-orange-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}