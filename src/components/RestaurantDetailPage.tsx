import { X, MapPin, Clock, Phone, Globe, Star, Share2, Camera, Bookmark } from 'lucide-react';
import { Post } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantDetailPageProps {
  post: Post;
  onClose: () => void;
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
        <Star key={`full-${i}`} className="w-5 h-5 fill-orange-400 text-orange-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-5 h-5">
          <Star className="w-5 h-5 text-orange-400 absolute" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
}

export function RestaurantDetailPage({ post, onClose, onToggleSave, isSaved }: RestaurantDetailPageProps) {
  // 店名を抽出（" - "より前の部分）
  const restaurantName = post.title.split(' - ')[0];
  const dishName = post.title.split(' - ')[1] || '';

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header with back button */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            {onToggleSave && (
              <button
                onClick={() => onToggleSave(post)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-500' : 'text-gray-600'}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64">
        <ImageWithFallback
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Camera className="w-4 h-4" />
          <span>写真 12枚</span>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-4">
        {/* Restaurant Name & Rating */}
        <div className="mb-4">
          <h1 className="text-2xl text-gray-900 mb-2">{restaurantName}</h1>
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={post.rating} />
            <span className="text-2xl text-gray-900">{post.rating.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500">({post.likes}件のレビュー)</p>
        </div>

        {/* Quick Info Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.genre?.map((g, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {g === 'cafe' ? 'カフェ' :
               g === 'korean' ? '韓国料理' :
               g === 'chinese' ? '中華料理' :
               g === 'ramen' ? 'ラーメン' : g}
            </span>
          ))}
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            ¥{post.budget.toLocaleString()}
          </span>
          {post.situation?.includes('date') && (
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
              デート向き
            </span>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700">{post.description}</p>
        </div>

        {/* Basic Info Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <h3 className="text-gray-900 mb-3">基本情報</h3>
          
          {post.location && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">住所</p>
                <p className="text-gray-900">{post.location}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">営業時間</p>
              <p className="text-gray-900">11:00〜22:00 (L.O. 21:30)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">電話番号</p>
              <p className="text-blue-600">03-1234-5678</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">定休日</p>
              <p className="text-gray-900">月曜日</p>
            </div>
          </div>
        </div>

        {/* Recommended Dish */}
        {dishName && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">おすすめメニュー</h3>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-orange-900 mb-1">{dishName}</p>
              <p className="text-sm text-gray-600">¥{post.budget.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Detailed Review */}
        {post.reportDetails && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">詳細レビュー</h3>
            
            {/* Dish Details */}
            {post.reportDetails.dishDetails && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm text-blue-900 mb-3">料理の詳細</h4>
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

            {/* Pros */}
            {post.reportDetails.prosPoints && post.reportDetails.prosPoints.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm text-green-900 mb-3">良い点</h4>
                <ul className="space-y-2">
                  {post.reportDetails.prosPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {post.reportDetails.consPoints && post.reportDetails.consPoints.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-900 mb-3">注意点</h4>
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

        {/* Reviewer Info */}
        <div className="border-t border-gray-200 pt-4 mt-6">
          <p className="text-sm text-gray-500 mb-2">レビュー投稿者</p>
          <div className="flex items-center gap-3">
            <div className="text-2xl">{post.authorAvatar}</div>
            <div>
              <p className="text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500">
                投稿日: {post.createdAt.toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pb-6">
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
            この店舗を予約する
          </button>
        </div>
      </div>
    </div>
  );
}