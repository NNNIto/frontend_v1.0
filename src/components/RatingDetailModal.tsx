import { X, Star, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RatingDetailData {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  createdAt: Date;
  goodCount?: number;
  badCount?: number;
  title?: string;
  description?: string;
  budget?: number;
  timeMinutes?: number;
  texture?: string;
  temperature?: string;
  goodPoints?: string;
  badPoints?: string;
  imageUrl?: string;
}

interface RatingDetailModalProps {
  rating: RatingDetailData;
  postTitle: string;
  onClose: () => void;
  onGoodClick?: () => void;
  onBadClick?: () => void;
  isGoodActive?: boolean;
  isBadActive?: boolean;
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

export function RatingDetailModal({ 
  rating, 
  postTitle, 
  onClose, 
  onGoodClick, 
  onBadClick,
  isGoodActive,
  isBadActive 
}: RatingDetailModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h3 className="text-lg text-gray-900">評価詳細</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          {/* Post Title */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">投稿</p>
            <p className="text-gray-900">{postTitle}</p>
          </div>

          {/* User Info */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{rating.userAvatar}</div>
              <div className="flex-1">
                <p className="text-gray-900">{rating.userName}</p>
                <p className="text-xs text-gray-500">
                  {rating.createdAt.toLocaleDateString('ja-JP')}
                </p>
              </div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-700 mb-2">星評価</p>
            <div className="flex items-center gap-3">
              <StarRating rating={rating.rating} />
              <span className="text-2xl text-orange-500">{rating.rating.toFixed(2)}</span>
            </div>
          </div>

          {/* Image */}
          {rating.imageUrl && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-700 mb-3">写真</p>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={rating.imageUrl}
                  alt={rating.title || '評価画像'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Title */}
          {rating.title && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-700 mb-2">タイトル</p>
              <p className="text-gray-900">{rating.title}</p>
            </div>
          )}

          {/* Description */}
          {rating.description && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-700 mb-2">説明</p>
              <p className="text-gray-900 whitespace-pre-wrap">{rating.description}</p>
            </div>
          )}

          {/* Budget and Time */}
          {(rating.budget || rating.timeMinutes) && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                {rating.budget !== undefined && rating.budget > 0 && (
                  <div>
                    <p className="text-sm text-gray-700 mb-1">予算</p>
                    <p className="text-gray-900">¥{rating.budget.toLocaleString()}</p>
                  </div>
                )}
                {rating.timeMinutes !== undefined && rating.timeMinutes > 0 && (
                  <div>
                    <p className="text-sm text-gray-700 mb-1">時間</p>
                    <div className="flex items-center gap-1 text-gray-900">
                      <Clock className="w-4 h-4" />
                      <span>{rating.timeMinutes}分</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Review Section */}
          {(rating.texture || rating.temperature) && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="text-sm text-gray-700 mb-3">料理のレビュー</h4>
              
              {rating.texture && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">食感</p>
                  <span className="inline-block px-4 py-2 rounded-full text-sm bg-orange-500 text-white">
                    {rating.texture}
                  </span>
                </div>
              )}

              {rating.temperature && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">温度</p>
                  <span className="inline-block px-4 py-2 rounded-full text-sm bg-orange-500 text-white">
                    {rating.temperature}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Good Points */}
          {rating.goodPoints && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="text-sm text-orange-900 mb-2 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  推しポイント
                </h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{rating.goodPoints}</p>
              </div>
            </div>
          )}

          {/* Bad Points */}
          {rating.badPoints && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-900 mb-2 flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4" />
                  推せないポイント
                </h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{rating.badPoints}</p>
              </div>
            </div>
          )}

          {/* Feedback Buttons */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-700">この評価は参考になりましたか？</p>
            <div className="flex items-center gap-2">
              <button
                onClick={onGoodClick}
                className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${
                  isGoodActive 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">
                  {(rating.goodCount || 0) + (isGoodActive ? 1 : 0)}
                </span>
              </button>
              <button
                onClick={onBadClick}
                className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${
                  isBadActive 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm">
                  {(rating.badCount || 0) + (isBadActive ? 1 : 0)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
