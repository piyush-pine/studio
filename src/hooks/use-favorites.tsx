
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import type { Temple } from '@/lib/temple-data';
import { useAuth } from './use-auth';


interface FavoritesContextType {
  favorites: Temple[];
  addFavorite: (temple: Temple) => void;
  removeFavorite: (templeId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Temple[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();
  
  const getStorageKey = useCallback(() => {
    return user ? `dharma-favorites-${user.uid}` : 'dharma-favorites-guest';
  }, [user]);

  useEffect(() => {
    if (user !== undefined) {
      try {
        const storedFavorites = localStorage.getItem(getStorageKey());
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Failed to load favorites from localStorage', error);
        setFavorites([]);
      } finally {
        setIsInitialized(true);
      }
    }
  }, [user, getStorageKey]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(getStorageKey(), JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
      }
    }
  }, [favorites, isInitialized, getStorageKey]);

  const addFavorite = (temple: Temple) => {
    setFavorites((prev) => {
      if (prev.some((t) => t.id === temple.id)) {
        return prev;
      }
      return [...prev, temple];
    });
  };

  const removeFavorite = (templeId: string) => {
    setFavorites((prev) => prev.filter((t) => t.id !== templeId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
