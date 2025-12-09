import { Settings, BookmarkIcon, Heart, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { mockPosts } from '../data/mockPosts';
import * as api from '../api';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileViewProps {
  onCreatePost?: () => void;
}

export function ProfileView({ onCreatePost }: ProfileViewProps) {
  const userStats = {
    posts: 24,
    followers: 1234,
    following: 567,
  };

  const [filterType, setFilterType] = useState<'all' | 'recipe' | 'restaurant'>('all');

  // Get user's posts and filter by type (fetch from backend when available)
  const [allUserPosts, setAllUserPosts] = useState(() => mockPosts.slice(0, 9));

  useEffect(() => {
    let mounted = true;
    (async () => {
      const fetched = await api.getPosts();
      if (!mounted) return;
      if (Array.isArray(fetched) && fetched.length > 0) {
        // For profile, limit to first 9 items
        setAllUserPosts((fetched as any[]).slice(0, 9));
      }
    })();
    return () => { mounted = false };
  }, []);
  const filteredPosts = filterType === 'all' 
    ? allUserPosts 
    : allUserPosts.filter(post => post.type === filterType);

  // Status badges logic
  const totalPosts = userStats.posts;
  
  // 通ステータス: 投稿数20以上
  const isTsuu = totalPosts >= 20;
  // 通レベル: 投稿数に基づいて計算 (20投稿でLv.1、30投稿でLv.2、...)
  const tsuuLevel = isTsuu ? Math.min(Math.floor((totalPosts - 20) / 10) + 1, 10) : 1;

  const handleEditProfile = () => {
    alert('プロフィール編集機能（実際のアプリでは編集画面に遷移します）');
  };

  const handleSettings = () => {
    alert('設定画面（実際のアプリでは設定画面に遷移します）');
  };

  const handleGridItemClick = (postTitle: string) => {
    alert(`投稿「${postTitle}」の詳細を表示（実際のアプリでは投稿詳細画面に遷移します）`);
  };

  const handleAddPost = () => {
    if (onCreatePost) {
      onCreatePost();
    } else {
      alert('投稿作成画面へ遷移（実際のアプリでは投稿作成フォームが表示されます）');
    }
  };

  return (
    <div className="px-4 py-6">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-3xl">
          👤
        </div>
        <div className="flex-1">
          <h2 className="mb-1">料理好き太郎</h2>
          <p className="text-gray-600 text-sm mb-3">
            食べることが大好き🍽️ レシピとお店の情報をシェアしています
          </p>
          
          {/* Status Tags */}
          <div className="flex gap-2 mb-3">
            {isTsuu && (
              <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
                🏆 通 Lv.{tsuuLevel}
              </span>
            )}
          </div>
          
          <div className="flex gap-4 text-sm">
            <button className="hover:opacity-70 transition-opacity">
              <span className="text-gray-900">{userStats.posts}</span>
              <span className="text-gray-600 ml-1">投稿</span>
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <span className="text-gray-900">{userStats.followers}</span>
              <span className="text-gray-600 ml-1">フォロワー</span>
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <span className="text-gray-900">{userStats.following}</span>
              <span className="text-gray-600 ml-1">フォロー中</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={handleEditProfile}
          className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          プロフィール編集
        </button>
        <button
          onClick={handleSettings}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          className={`rounded-lg p-4 text-center transition-colors ${
            filterType === 'recipe' ? 'bg-green-500 text-white' : 'bg-green-50 hover:bg-green-100'
          }`}
          onClick={() => setFilterType('recipe')}
        >
          <div className={filterType === 'recipe' ? 'text-white mb-1' : 'text-green-600 mb-1'}>🍳</div>
          <div className={filterType === 'recipe' ? 'text-white text-xs' : 'text-gray-600 text-xs'}>レシピ投稿</div>
          <div className={filterType === 'recipe' ? 'text-white' : 'text-gray-900'}>15</div>
        </button>
        <button
          className={`rounded-lg p-4 text-center transition-colors ${
            filterType === 'restaurant' ? 'bg-blue-500 text-white' : 'bg-blue-50 hover:bg-blue-100'
          }`}
          onClick={() => setFilterType('restaurant')}
        >
          <div className={filterType === 'restaurant' ? 'text-white mb-1' : 'text-blue-600 mb-1'}>🏪</div>
          <div className={filterType === 'restaurant' ? 'text-white text-xs' : 'text-gray-600 text-xs'}>外食投稿</div>
          <div className={filterType === 'restaurant' ? 'text-white' : 'text-gray-900'}>9</div>
        </button>
        <button
          className="bg-purple-50 rounded-lg p-4 text-center hover:bg-purple-100 transition-colors"
          onClick={() => alert('いいねした投稿一覧を表示')}
        >
          <div className="text-purple-600 mb-1">❤️</div>
          <div className="text-gray-600 text-xs">いいね合計</div>
          <div className="text-gray-900">2.3K</div>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button 
          onClick={() => setFilterType('all')}
          className={`flex-1 py-3 transition-colors ${
            filterType === 'all' 
              ? 'border-b-2 border-orange-500 text-orange-500' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          投稿
        </button>
        <button
          className="flex-1 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => alert('保存した投稿を表示')}
        >
          <BookmarkIcon className="w-5 h-5 mx-auto" />
        </button>
        <button
          className="flex-1 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => alert('いいねした投稿を表示')}
        >
          <Heart className="w-5 h-5 mx-auto" />
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {filteredPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => handleGridItemClick(post.title)}
            className="aspect-square relative overflow-hidden hover:opacity-80 transition-opacity"
          >
            <ImageWithFallback
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {/* Type Badge */}
            <div className={`absolute top-1 right-1 px-2 py-1 rounded text-xs ${
              post.type === 'recipe' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {post.type === 'recipe' ? '🍳' : '🏪'}
            </div>
          </button>
        ))}
        <button
          onClick={handleAddPost}
          className="aspect-square relative overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
        >
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Plus className="w-12 h-12 mb-1" />
            <span className="text-xs">投稿を追加</span>
          </div>
        </button>
      </div>

      {/* Note about backend */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 実際のアプリでは、ユーザー情報や投稿データはバックエンドから取得されます
        </p>
      </div>
    </div>
  );
}