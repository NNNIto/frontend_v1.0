import { useState } from 'react';
import { CalendarCheck, Search, User, Bookmark } from 'lucide-react';
import { SearchView } from './components/SearchView';
import { BudgetView } from './components/BudgetView';
import { ProfileView } from './components/ProfileView';
import { SavedView } from './components/SavedView';
import { RestaurantDetailPage } from './components/RestaurantDetailPage';
import { RecipeDetailView } from './components/RecipeDetailView';
import { CreatePostView } from './components/CreatePostView';
import { Post } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'budget' | 'search' | 'saved' | 'profile'>('budget');
  const [budgetSearchQuery, setBudgetSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Post | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Post | null>(null);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleEditToPlan = (title: string) => {
    setBudgetSearchQuery(title);
    setActiveTab('budget');
  };

  const handleRestaurantClick = (post: Post) => {
    if (post.type === 'restaurant') {
      setSelectedRestaurant(post);
    }
  };

  const handleCloseRestaurant = () => {
    setSelectedRestaurant(null);
  };

  const handleRecipeClick = (post: Post) => {
    if (post.type === 'recipe') {
      setSelectedRecipe(post);
    }
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  const handleToggleSave = (post: Post) => {
    setSavedPosts((prev) => {
      const isAlreadySaved = prev.some((p) => p.id === post.id);
      if (isAlreadySaved) {
        return prev.filter((p) => p.id !== post.id);
      } else {
        return [...prev, post];
      }
    });
  };

  const isPostSaved = (postId: string) => {
    return savedPosts.some((p) => p.id === postId);
  };

  const handleCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
  };

  const handleSubmitPost = (postData: any) => {
    console.log('投稿データ:', postData);
    // 実際のアプリではバックエンドに送信
    (async () => {
      try {
        const { createPost } = await import('./api');
        const res = await createPost(postData);
        if (res) {
          // Optionally, add to savedPosts or re-fetch lists in a real app
          console.log('投稿作成成功:', res);
          alert('投稿をバックエンドに送信しました');
        } else {
          alert('投稿に失敗しました（ネットワークの問題など）');
        }
      } catch (e) {
        console.warn(e);
        alert('投稿中にエラーが発生しました');
      }
    })();
  };

  // 投稿作成画面が開いている場合
  if (showCreatePost) {
    return (
      <CreatePostView
        onClose={handleCloseCreatePost}
        onSubmit={handleSubmitPost}
      />
    );
  }

  // 店舗詳細ページが開いている場合
  if (selectedRestaurant) {
    return (
      <RestaurantDetailPage
        post={selectedRestaurant}
        onClose={handleCloseRestaurant}
        onToggleSave={handleToggleSave}
        isSaved={isPostSaved(selectedRestaurant.id)}
      />
    );
  }

  // レシピ詳細ページが開いている場合
  if (selectedRecipe) {
    return (
      <RecipeDetailView
        post={selectedRecipe}
        onClose={handleCloseRecipe}
        onToggleSave={handleToggleSave}
        isSaved={isPostSaved(selectedRecipe.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-[430px] mx-auto relative pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-center text-orange-500">🍽️ FoodMood</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-120px)]">
        {activeTab === 'budget' && (
          <BudgetView 
            initialSearchQuery={budgetSearchQuery}
            onSearchQueryChange={setBudgetSearchQuery}
          />
        )}
        {activeTab === 'search' && (
          <SearchView 
            onEditToPlan={handleEditToPlan}
            onRestaurantClick={handleRestaurantClick}
            onRecipeClick={handleRecipeClick}
            onToggleSave={handleToggleSave}
            isPostSaved={isPostSaved}
          />
        )}
        {activeTab === 'saved' && (
          <SavedView 
            savedPosts={savedPosts}
            onPostClick={handleRestaurantClick}
            onRecipeClick={handleRecipeClick}
            onToggleSave={handleToggleSave}
          />
        )}
        {activeTab === 'profile' && <ProfileView onCreatePost={handleCreatePost} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('budget')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeTab === 'budget' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <CalendarCheck className="w-6 h-6" />
            <span className="text-xs mt-1">プラン</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeTab === 'search' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs mt-1">検索</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeTab === 'saved' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <Bookmark className="w-6 h-6" />
            <span className="text-xs mt-1">保存</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeTab === 'profile' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">マイページ</span>
          </button>
        </div>
      </nav>
    </div>
  );
}