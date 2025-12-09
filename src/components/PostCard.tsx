import { MessageCircle, Clock, MapPin, ChefHat, ThumbsUp, ThumbsDown, Star, Bookmark } from 'lucide-react';
import { Post } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
  onToggleSave?: (post: Post) => void;
  isSaved?: boolean;
}

// 星評価表示コンポーネント
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-3.5 h-3.5">
          <Star className="w-3.5 h-3.5 text-orange-400 absolute" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
      ))}
      <span className="text-sm text-gray-700 ml-1">{rating.toFixed(2)}</span>
    </div>
  );
}

export function PostCard({ post, onClick, onToggleSave, isSaved }: PostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="text-2xl">{post.authorAvatar}</div>
        <div className="flex-1">
          <p className="text-gray-900">{post.author}</p>
          <p className="text-xs text-gray-500">
            {post.createdAt.toLocaleDateString('ja-JP')}
          </p>
        </div>
        {post.isExpert && (
          <span className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
            🏆 通 Lv.{post.expertLevel || 1}
          </span>
        )}
        <span className={`px-3 py-1 rounded-full text-xs ${
          post.type === 'recipe' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {post.type === 'recipe' ? '🍳 レシピ' : '🏪 外食'}
        </span>
      </div>

      {/* Image */}
      <div className="relative w-full h-64" onClick={() => onClick(post)}>
        <ImageWithFallback
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Star Rating */}
        <h3 className="text-gray-900 mb-2">{post.title}</h3>
        <div className="mb-3">
          <StarRating rating={post.rating} />
        </div>
        <p className="text-sm text-gray-600 mb-3">{post.description}</p>

        {/* Basic Info */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.timeMinutes}分</span>
          </div>
          <div className="flex items-center gap-1">
            <span>¥{post.budget.toLocaleString()}</span>
          </div>
          {post.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{post.location}</span>
            </div>
          )}
        </div>

        {/* Report Details */}
        {post.reportDetails && (
          <div className="space-y-4 mb-4">
            {/* Restaurant Details */}
            {post.type === 'restaurant' && post.reportDetails.dishDetails && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm text-blue-900 mb-3 flex items-center gap-2">
                  <ChefHat className="w-4 h-4" />
                  料理の詳細
                </h4>
                <div className="space-y-2">
                  {post.reportDetails.dishDetails.map((detail, idx) => (
                    <div key={idx} className="flex text-sm">
                      <span className="text-blue-700 min-w-[80px]">{detail.label}:</span>
                      <span className="text-gray-700">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pros Points */}
            {post.reportDetails.prosPoints && post.reportDetails.prosPoints.length > 0 && (
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="text-sm text-orange-900 mb-3 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  推しポイント
                </h4>
                <ul className="space-y-2">
                  {post.reportDetails.prosPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cooking Tips */}
            {post.reportDetails.cookingTips && post.reportDetails.cookingTips.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm text-purple-900 mb-3 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  調理のコツ
                </h4>
                <ul className="space-y-2">
                  {post.reportDetails.cookingTips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-500 mt-0.5">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons Points */}
            {post.reportDetails.consPoints && post.reportDetails.consPoints.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4" />
                  推せないポイント
                </h4>
                <ul className="space-y-2">
                  {post.reportDetails.consPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">⚠</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tags - REMOVED */}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
          {onToggleSave && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(post);
              }}
              className={`flex items-center gap-2 transition-colors ${
                isSaved ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
              />
              <span className="text-sm">{isSaved ? '保存中' : '保存'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}