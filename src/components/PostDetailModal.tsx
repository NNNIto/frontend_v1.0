import { MessageCircle, Clock, MapPin, ChefHat, ThumbsUp, ThumbsDown, X, Edit, Star, Bookmark, Heart, StarHalf, ListChecks, PenLine } from 'lucide-react';
import { Post } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { RatingInputModal } from './RatingInputModal';
import { RatingListModal } from './RatingListModal';

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
  onEditToPlan?: (title: string) => void;
  onRestaurantClick?: (post: Post) => void;
  onRecipeClick?: (post: Post) => void;
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
      <span className="ml-1">{rating.toFixed(2)}</span>
    </div>
  );
}

export function PostDetailModal({ post, onClose, onEditToPlan, onRestaurantClick, onRecipeClick, onToggleSave, isSaved }: PostDetailModalProps) {
  const [isRatingInputModalOpen, setIsRatingInputModalOpen] = useState(false);
  const [isRatingListModalOpen, setIsRatingListModalOpen] = useState(false);

  // Mock rating data
  const mockRatings = [
    { 
      id: '1', 
      userId: 'u1', 
      userName: '料理好き太郎', 
      userAvatar: '👨‍🍳', 
      rating: 4.5, 
      createdAt: new Date('2024-12-01'), 
      goodCount: 12, 
      badCount: 2,
      title: '期待以上の美味しさでした',
      description: '卵がふわふわで、デミグラスソースの深いコクが絶品。隠し味に何か特別なスパイスが入っているような気がします。',
      budget: 1200,
      timeMinutes: 30,
      texture: 'やわらかめ',
      temperature: '熱め',
      goodPoints: 'オムライスの卵が本当にふわふわで、口の中でとろけます。デミグラスソースとの相性が抜群で、何度でも食べたくなる味です。',
      badPoints: 'ランチタイムは混雑するので、予約をおすすめします。少し量が少なめなので、男性には物足りないかも。',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'
    },
    { 
      id: '2', 
      userId: 'u2', 
      userName: 'グルメ花子', 
      userAvatar: '🍽️', 
      rating: 5.0, 
      createdAt: new Date('2024-12-03'), 
      goodCount: 23, 
      badCount: 0,
      title: '最高のオムライス！',
      description: '今まで食べたオムライスの中で一番美味しかったです。プロの技を感じる一品。',
      budget: 1500,
      timeMinutes: 45,
      texture: 'もちもち',
      temperature: '熱め',
      goodPoints: '卵の焼き加減が完璧。中がとろとろで外はふわふわ。シェフのこだわりを感じます。',
      badPoints: '特にありません。完璧です！',
      imageUrl: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=800'
    },
    { 
      id: '3', 
      userId: 'u3', 
      userName: 'ラーメン探検家', 
      userAvatar: '🍜', 
      rating: 4.0, 
      createdAt: new Date('2024-12-05'), 
      goodCount: 8, 
      badCount: 1,
      title: '美味しいけど少し高め',
      description: '味は申し分ないですが、コスパを考えると少し高いかなという印象。',
      budget: 1800,
      timeMinutes: 50,
      texture: 'やわらかめ',
      temperature: '熱すぎる',
      goodPoints: '味のクオリティは高い。特にソースが美味しい。',
      badPoints: '価格が少し高め。もう少しボリュームがあると嬉しい。'
    },
    { 
      id: '4', 
      userId: 'u4', 
      userName: 'カフェ巡りみく', 
      userAvatar: '☕', 
      rating: 4.5, 
      createdAt: new Date('2024-12-06'), 
      goodCount: 15, 
      badCount: 3,
      title: 'インスタ映えする美しさ',
      description: '見た目も味も素晴らしい。写真映えするので、SNSに載せたくなります。',
      budget: 1400,
      timeMinutes: 40,
      texture: 'もちもち',
      temperature: 'ぬるめ',
      goodPoints: 'プレゼンテーションが美しい。味も期待を裏切らない美味しさ。',
      badPoints: '提供まで少し時間がかかる。温度がもう少し高いと完璧。',
      imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800'
    },
    { 
      id: '5', 
      userId: 'u5', 
      userName: 'おうちシェフ', 
      userAvatar: '🍔', 
      rating: 3.5, 
      createdAt: new Date('2024-12-07'), 
      goodCount: 5, 
      badCount: 7,
      title: '普通のオムライス',
      description: '可もなく不可もなく。特別感は感じませんでした。',
      budget: 1000,
      timeMinutes: 25,
      texture: 'かため',
      temperature: 'ぬるすぎる',
      goodPoints: '価格は比較的リーズナブル。',
      badPoints: '卵が少し固め。温度がぬるい。特別な感動はなかった。'
    },
  ];

  const handleRatingSubmit = (data: any) => {
    console.log('評価を送信:', data);
    // 実際のアプリではAPIに送信
    alert(`評価を送信しました！\n星評価: ${data.rating.toFixed(2)}\nタイトル: ${data.title || '（未入力）'}`);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-xl shadow-xl max-w-[430px] w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="sticky top-0 bg-white z-10 flex justify-end p-2 border-b border-gray-200">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

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
              <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
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
          <div className="relative w-full h-64">
            <ImageWithFallback
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Actions - Moved here, right after image */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRatingInputModalOpen(true);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <PenLine className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRatingListModalOpen(true);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <ListChecks className="w-6 h-6" />
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
                    className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`}
                  />
                </button>
              )}
              {onEditToPlan && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditToPlan(post.title);
                  }}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors ml-auto"
                >
                  <Edit className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title & Star Rating */}
            {post.type === 'restaurant' && onRestaurantClick ? (
              <h3 
                className="text-gray-900 mb-2 cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => {
                  onRestaurantClick(post);
                  onClose();
                }}
              >
                {post.title} →
              </h3>
            ) : post.type === 'recipe' && onRecipeClick ? (
              <h3 
                className="text-gray-900 mb-2 cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => {
                  onRecipeClick(post);
                  onClose();
                }}
              >
                {post.title} →
              </h3>
            ) : (
              <h3 className="text-gray-900 mb-2">{post.title}</h3>
            )}
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
          </div>
        </div>

        {/* Rating Input Modal */}
        {isRatingInputModalOpen && (
          <RatingInputModal
            postTitle={post.title}
            onClose={() => setIsRatingInputModalOpen(false)}
            onSubmit={handleRatingSubmit}
          />
        )}

        {/* Rating List Modal */}
        {isRatingListModalOpen && (
          <RatingListModal
            postTitle={post.title}
            averageRating={post.rating}
            totalRatings={mockRatings.length}
            ratings={mockRatings}
            onClose={() => setIsRatingListModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}