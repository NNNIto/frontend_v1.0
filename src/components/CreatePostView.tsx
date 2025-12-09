import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface CreatePostViewProps {
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

type PostType = 'recipe' | 'restaurant' | 'purchase';

interface Ingredient {
  name: string;
  amount: string;
}

interface Step {
  description: string;
}

export function CreatePostView({ onClose, onSubmit }: CreatePostViewProps) {
  const [postType, setPostType] = useState<PostType>('recipe');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  // レビュー項目（全投稿タイプ共通）
  const [texture, setTexture] = useState('');
  const [temperature, setTemperature] = useState('');
  
  // レシピ専用の項目
  const [servings, setServings] = useState('2');
  const [calories, setCalories] = useState('');
  const [cookingTips, setCookingTips] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', amount: '' }
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { description: '' }
  ]);

  // 外食専用の項目
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [genre, setGenre] = useState('');
  const [goodPoints, setGoodPoints] = useState('');
  const [badPoints, setBadPoints] = useState('');

  // 購入品専用の項目
  const [productName, setProductName] = useState('');
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [brand, setBrand] = useState('');

  const postTypeOptions = [
    { value: 'recipe', label: 'レシピ', icon: '🍳', color: 'bg-green-500' },
    { value: 'restaurant', label: '外食', icon: '🏪', color: 'bg-blue-500' },
    { value: 'purchase', label: '購入品', icon: '🛒', color: 'bg-purple-500' },
  ];

  const textureOptions = ['かため', 'やわらかめ', 'もちもち'];
  const temperatureOptions = ['熱すぎる', 'ぬるすぎる', '熱め', 'ぬるめ'];

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddStep = () => {
    setSteps([...steps, { description: '' }]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index].description = value;
    setSteps(newSteps);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    const baseData = {
      type: postType,
      title,
      description,
      budget: parseInt(budget) || 0,
      timeMinutes: parseInt(timeMinutes) || 0,
      tags,
      texture,
      temperature,
    };

    if (postType === 'recipe') {
      const postData = {
        ...baseData,
        servings: parseInt(servings) || 2,
        calories: parseInt(calories) || 0,
        cookingTips,
        ingredients: ingredients.filter(ing => ing.name && ing.amount),
        steps: steps.filter(step => step.description),
      };
      onSubmit(postData);
    } else if (postType === 'restaurant') {
      const postData = {
        ...baseData,
        storeName,
        storeAddress,
        location,
        genre,
        goodPoints,
        badPoints,
      };
      onSubmit(postData);
    } else {
      const postData = {
        ...baseData,
        productName,
        purchaseLocation,
        brand,
      };
      onSubmit(postData);
    }
    
    alert('投稿を作成しました！（実際のアプリではバックエンドに送信されます）');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center mx-4">投稿を作成</h1>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-sm"
        >
          投稿
        </button>
      </div>

      {/* Content */}
      <div className="pb-20 px-4">
        {/* Post Type Selection */}
        <div className="py-4 border-b border-gray-200">
          <label className="text-sm text-gray-700 mb-3 block">投稿タイプ</label>
          <div className="grid grid-cols-2 gap-2">
            {postTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPostType(option.value as PostType)}
                className={`p-3 rounded-lg text-center transition-all ${
                  postType === option.value
                    ? `${option.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{option.icon}</div>
                <div className="text-xs">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="py-4 border-b border-gray-200">
          <label className="text-sm text-gray-700 mb-3 block">写真</label>
          <button className="w-full aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
            <Upload className="w-12 h-12 mb-2" />
            <span className="text-sm">写真を追加</span>
          </button>
        </div>

        {/* Common Fields */}
        <div className="py-4 border-b border-gray-200">
          <label className="text-sm text-gray-700 mb-2 block">タイトル *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={postType === 'recipe' ? '例：ふわふわオムライス' : '例：渋谷の隠れ家イタリアン'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="py-4 border-b border-gray-200">
          <label className="text-sm text-gray-700 mb-2 block">説明 *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={postType === 'recipe' ? '例：卵をふわふわに仕上げるコツを紹介します。家族に大好評のレシピです！' : '例：落ち着いた雰囲気で、本格的なイタリア料理が楽しめます。デートにもおすすめ！'}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="py-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">予算（円）*</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={postType === 'recipe' ? '例：500' : '例：3000'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                {postType === 'recipe' ? '調理時間（分）' : '滞在時間（分）'}*
              </label>
              <input
                type="number"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                placeholder={postType === 'recipe' ? '例：30' : '例：90'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Recipe-specific fields */}
        {postType === 'recipe' && (
          <>
            <div className="py-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">人数（人分）</label>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    placeholder="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">カロリー（kcal）</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="450"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-gray-700">材料</label>
                <button
                  onClick={handleAddIngredient}
                  className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600"
                >
                  <Plus className="w-4 h-4" />
                  材料を追加
                </button>
              </div>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      placeholder="材料名"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    <input
                      type="text"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                      placeholder="分量"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    {ingredients.length > 1 && (
                      <button
                        onClick={() => handleRemoveIngredient(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-gray-700">作り方</label>
                <button
                  onClick={handleAddStep}
                  className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600"
                >
                  <Plus className="w-4 h-4" />
                  手順を追加
                </button>
              </div>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-2">
                      {index + 1}
                    </div>
                    <textarea
                      value={step.description}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder={`手順${index + 1}を入力`}
                      rows={2}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    {steps.length > 1 && (
                      <button
                        onClick={() => handleRemoveStep(index)}
                        className="p-2 text-gray-400 hover:text-red-500 mt-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Tips */}
            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">調理のコツ</label>
              <textarea
                value={cookingTips}
                onChange={(e) => setCookingTips(e.target.value)}
                placeholder="例：卵は常温に戻しておくと、ふわふわに仕上がります"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </>
        )}

        {/* Non-recipe fields */}
        {postType !== 'recipe' && (
          <>
            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">店舗名</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="例：トラットリア ベッラ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">住所</label>
              <input
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                placeholder="例：東京都渋谷区神南1-2-3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">場所</label>
              <div className="flex gap-2 flex-wrap">
                {['東京', '大阪', '名古屋', '福岡', 'その他'].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      location === loc
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">ジャンル</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="例：イタリアン"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Good Points */}
            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">推しポイント</label>
              <textarea
                value={goodPoints}
                onChange={(e) => setGoodPoints(e.target.value)}
                placeholder="例：シェフ自慢のマルゲリータが絶品！生地がもちもちで、トマトソースの酸味と甘みが絶妙です"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Bad Points */}
            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">推せないポイント</label>
              <textarea
                value={badPoints}
                onChange={(e) => setBadPoints(e.target.value)}
                placeholder="例：ランチタイムは混雑するので、予約がおすすめです"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </>
        )}

        {/* Purchase-specific fields */}
        {postType === 'purchase' && (
          <>
            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">製品名</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="例：コンビニのサンドイッチ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">購入場所</label>
              <input
                type="text"
                value={purchaseLocation}
                onChange={(e) => setPurchaseLocation(e.target.value)}
                placeholder="例：セブンイレブン渋谷店"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="py-4 border-b border-gray-200">
              <label className="text-sm text-gray-700 mb-2 block">ブランド</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="例：セブンプレミアム"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </>
        )}

        {/* Review Section (Common for all types) */}
        <div className="py-4 border-b border-gray-200">
          <h3 className="text-sm text-gray-700 mb-4">料理のレビュー</h3>
          
          {/* Texture */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">食感</label>
            <div className="flex gap-2 flex-wrap">
              {textureOptions.map((option) => (
                <button
                  key={option}
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

        {/* Tags */}
        <div className="py-4 border-b border-gray-200">
          <label className="text-sm text-gray-700 mb-3 block">タグ</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="タグを入力してEnter"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              追加
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-orange-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 実際のアプリでは、画像アップロードやバックエンドへのデータ送信が行われます
          </p>
        </div>
      </div>
    </div>
  );
}