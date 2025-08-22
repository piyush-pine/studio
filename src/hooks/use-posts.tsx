'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export interface Post {
  id: string;
  author: string;
  message: string;
  timestamp: string;
}

interface PostsContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'timestamp'>) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem('dharma-posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    } catch (error) {
      console.error('Failed to load posts from localStorage', error);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('dharma-posts', JSON.stringify(posts));
      } catch (error) {
        console.error('Failed to save posts to localStorage', error);
      }
    }
  }, [posts, isInitialized]);

  const addPost = (post: Omit<Post, 'id' | 'timestamp'>) => {
    setPosts((prev) => [
      {
        ...post,
        id: new Date().toISOString() + Math.random(),
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}
