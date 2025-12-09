import { useEffect, useState } from 'react';
import { PostCard } from './PostCard';
import { mockPosts } from '../data/mockPosts';
import { Post } from '../types';
import * as api from '../api';

interface FeedViewProps {
  onNavigateToBudget: (query: string) => void;
}

export function FeedView({ onNavigateToBudget }: FeedViewProps) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          } 
        : post
    ));
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const fetched = await api.getPosts();
      if (!mounted) return;
      if (Array.isArray(fetched) && fetched.length > 0) {
        setPosts(fetched as Post[]);
      }
    })();
    return () => { mounted = false };
  }, []);

  const handlePostClick = (post: Post) => {
    alert(`投稿「${post.title}」の詳細を表示（実際のアプリでは詳細画面に遷移します）`);
  };

  return (
    <div className="pb-4">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={handleLike}
          onClick={handlePostClick}
        />
      ))}
    </div>
  );
}