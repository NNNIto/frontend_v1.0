import { X, Star, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { RatingDetailModal } from './RatingDetailModal';

interface Rating {
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

interface RatingListModalProps {
  postTitle: string;
  averageRating: number;
  totalRatings: number;
  ratings: Rating[];
  onClose: () => void;
}

// 星評価表示コンポーネント
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-orange-400 text-orange-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <Star className="w-4 h-4 text-orange-400 absolute" />
          <div className="overflow-hidden w-1/2 absolute">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}

// 評価分布グラフ
function RatingDistribution({ ratings }: { ratings: Rating[] }) {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = ratings.filter((r) => Math.floor(r.rating) === star || (star === 5 && r.rating === 5)).length;
    const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="space-y-2">
      {distribution.map(({ star, count, percentage }) => (
        <div key={star} className="flex items-center gap-2">
          <span className="text-sm text-gray-600 w-8">{star}★</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-400 h-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 w-12 text-right">{count}件</span>
        </div>
      ))}
    </div>
  );
}

export function RatingListModal({ postTitle, averageRating, totalRatings, ratings, onClose }: RatingListModalProps) {
  // 各評価のgood/bad状態を管理
  const [feedbackState, setFeedbackState] = useState<Record<string, { good: boolean; bad: boolean }>>({});
  // 選択された評価の詳細モーダル
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  const handleGoodClick = (ratingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedbackState((prev) => ({
      ...prev,
      [ratingId]: {
        good: !prev[ratingId]?.good,
        bad: false,
      },
    }));
  };

  const handleBadClick = (ratingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedbackState((prev) => ({
      ...prev,
      [ratingId]: {
        good: false,
        bad: !prev[ratingId]?.bad,
      },
    }));
  };

  const handleRatingClick = (rating: Rating) => {
    setSelectedRating(rating);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">評価一覧</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Post Title */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">投稿</p>
            <p className="text-gray-900">{postTitle}</p>
          </div>

          {/* Average Rating */}
          <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">平均評価</p>
                <div className="flex items-center gap-2">
                  <span className="text-4xl text-orange-500">{averageRating.toFixed(2)}</span>
                  <div className="flex flex-col">
                    <StarRating rating={averageRating} />
                    <span className="text-xs text-gray-500 mt-1">{totalRatings}件の評価</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-orange-500 bg-white px-3 py-2 rounded-lg shadow-sm">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">高評価</span>
              </div>
            </div>

            {/* Distribution */}
            <RatingDistribution ratings={ratings} />
          </div>

          {/* Individual Ratings */}
          <div className="p-4">
            <h4 className="text-sm text-gray-900 mb-3">ユーザー評価</h4>
            <div className="space-y-3">
              {ratings.map((rating) => (
                <div 
                  key={rating.id} 
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" 
                  onClick={() => handleRatingClick(rating)}
                >
                  <div className="text-2xl">{rating.userAvatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-900">{rating.userName}</p>
                      <span className="text-xs text-gray-500">
                        {rating.createdAt.toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={rating.rating} />
                      <span className="text-orange-500">{rating.rating.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={(e) => handleGoodClick(rating.id, e)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                          feedbackState[rating.id]?.good 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="text-xs">
                          {(rating.goodCount || 0) + (feedbackState[rating.id]?.good ? 1 : 0)}
                        </span>
                      </button>
                      <button
                        onClick={(e) => handleBadClick(rating.id, e)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                          feedbackState[rating.id]?.bad 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                        <span className="text-xs">
                          {(rating.badCount || 0) + (feedbackState[rating.id]?.bad ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <p className="text-xs text-blue-800">
            💡 評価は小数第2位まで表示されます。0.5刻みで評価できます。
          </p>
        </div>
      </div>
      {/* 評価詳細モーダル */}
      {selectedRating && (
        <RatingDetailModal
          rating={selectedRating}
          postTitle={postTitle}
          onClose={() => setSelectedRating(null)}
          onGoodClick={() => handleGoodClick(selectedRating.id, { stopPropagation: () => {} } as React.MouseEvent)}
          onBadClick={() => handleBadClick(selectedRating.id, { stopPropagation: () => {} } as React.MouseEvent)}
          isGoodActive={feedbackState[selectedRating.id]?.good || false}
          isBadActive={feedbackState[selectedRating.id]?.bad || false}
        />
      )}
    </div>
  );
}