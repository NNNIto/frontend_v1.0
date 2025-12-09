import { X, Star, Upload } from 'lucide-react';
import { useState } from 'react';

interface RatingInputModalProps {
  postTitle: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function RatingInputModal({ postTitle, onClose, onSubmit }: RatingInputModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // 投稿作成画面と同じ項目
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [texture, setTexture] = useState('');
  const [temperature, setTemperature] = useState('');
  const [goodPoints, setGoodPoints] = useState('');
  const [badPoints, setBadPoints] = useState('');

  const textureOptions = ['かため', 'やわらかめ', 'もちもち'];
  const temperatureOptions = ['熱すぎる', 'ぬるすぎる', '熱め', 'ぬるめ'];

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      const data = {
        rating,
        title,
        description,
        budget: parseInt(budget) || 0,
        timeMinutes: parseInt(timeMinutes) || 0,
        texture,
        temperature,
        goodPoints,
        badPoints,
      };
      onSubmit(data);
      onClose();
    }
  };

  // Generate 10 half-star buttons (0.5, 1.0, 1.5, ..., 5.0)
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const fullValue = i;
      const halfValue = i - 0.5;

      stars.push(
        <div key={i} className="relative inline-block">
          {/* Left half (0.5 star) */}
          <button
            type="button"
            className="absolute left-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHoverRating(halfValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleStarClick(halfValue)}
          />
          {/* Right half (1.0 star) */}
          <button
            type="button"
            className="absolute right-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHoverRating(fullValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleStarClick(fullValue)}
          />
          {/* Visual star */}
          <Star
            className={`w-10 h-10 transition-colors ${
              (hoverRating || rating) >= fullValue
                ? 'fill-orange-400 text-orange-400'
                : (hoverRating || rating) >= halfValue
                ? 'fill-orange-400/50 text-orange-400'
                : 'fill-gray-200 text-gray-300'
            }`}
          />
        </div>
      );
    }
    return stars;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h3 className="text-lg text-gray-900">評価を入力</h3>
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

          {/* Star Rating Input */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-700 mb-3">星評価 *</p>
            <div className="flex justify-center gap-1 mb-3">
              {renderStars()}
            </div>
            <div className="text-center">
              <span className="text-3xl text-orange-500">
                {rating > 0 ? rating.toFixed(2) : '---'}
              </span>
              <span className="text-gray-500 ml-2">/ 5.00</span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              星をタップして0.5刻みで評価できます
            </p>
          </div>

          {/* Image Upload */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="text-sm text-gray-700 mb-3 block">写真</label>
            <button className="w-full aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
              <Upload className="w-10 h-10 mb-2" />
              <span className="text-sm">写真を追加</span>
            </button>
          </div>

          {/* Title */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="text-sm text-gray-700 mb-2 block">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：最高のオムライスでした"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="text-sm text-gray-700 mb-2 block">説明</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例：卵がふわふわで、デミグラスソースとの相性が抜群でした"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Budget and Time */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">予算（円）</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="例：1200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">時間（分）</label>
                <input
                  type="number"
                  value={timeMinutes}
                  onChange={(e) => setTimeMinutes(e.target.value)}
                  placeholder="例：30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h4 className="text-sm text-gray-700 mb-4">料理のレビュー</h4>
            
            {/* Texture */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">食感</label>
              <div className="flex gap-2 flex-wrap">
                {textureOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTexture(option)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      texture === option
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">温度</label>
              <div className="flex gap-2 flex-wrap">
                {temperatureOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTemperature(option)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      temperature === option
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Good Points */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="text-sm text-gray-700 mb-2 block">推しポイント</label>
            <textarea
              value={goodPoints}
              onChange={(e) => setGoodPoints(e.target.value)}
              placeholder="例：卵がふわふわで絶品。デミグラスソースとの相性抜群"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Bad Points */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="text-sm text-gray-700 mb-2 block">推せないポイント</label>
            <textarea
              value={badPoints}
              onChange={(e) => setBadPoints(e.target.value)}
              placeholder="例：少し量が少なめ。ランチタイムは混雑します"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Guide */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-xs text-blue-800">
              💡 星評価は必須です。その他の項目は任意で入力できます。
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`flex-1 py-3 rounded-lg transition-colors ${
                rating > 0
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              評価を送信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
