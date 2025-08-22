'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { useAuth } from './use-auth';
import type { LucideIcon } from 'lucide-react';
import { Medal, Gem, Shield, Crown } from 'lucide-react';

// Define the structure for a badge
export interface KarmaBadge {
  name: string;
  description: string;
  points: number;
  icon: LucideIcon;
}

// Define all available badges
export const KARMA_BADGES: KarmaBadge[] = [
  { name: 'Good Samaritan', description: 'Awarded for your first act of giving.', points: 10, icon: Medal },
  { name: 'Dharma Contributor', description: 'You are a consistent supporter of Dharma.', points: 50, icon: Gem },
  { name: 'Temple Guardian', description: 'A significant contributor to sacred spaces.', points: 150, icon: Shield },
  { name: 'Patron of Faith', description: 'Your generosity knows no bounds.', points: 500, icon: Crown },
];

interface KarmaContextType {
  karma: number;
  badges: KarmaBadge[];
  addKarma: (points: number) => void;
}

const KarmaContext = createContext<KarmaContextType | undefined>(undefined);

export function KarmaProvider({ children }: { children: ReactNode }) {
  const [karma, setKarma] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  const getStorageKey = useCallback(() => {
    return user ? `dharma-karma-${user.uid}` : null;
  }, [user]);

  // Load karma from localStorage when user context is available
  useEffect(() => {
    const storageKey = getStorageKey();
    if (storageKey) {
      try {
        const storedKarma = localStorage.getItem(storageKey);
        if (storedKarma) {
          setKarma(JSON.parse(storedKarma));
        } else {
          setKarma(0);
        }
      } catch (error) {
        console.error('Failed to load karma from localStorage', error);
        setKarma(0);
      } finally {
        setIsInitialized(true);
      }
    } else if (!user) {
        // If user logs out, reset state
        setKarma(0);
        setIsInitialized(false);
    }
  }, [user, getStorageKey]);

  // Save karma to localStorage whenever it changes
  useEffect(() => {
    const storageKey = getStorageKey();
    if (isInitialized && storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(karma));
      } catch (error) {
        console.error('Failed to save karma to localStorage', error);
      }
    }
  }, [karma, isInitialized, getStorageKey]);

  const addKarma = (points: number) => {
    setKarma((prev) => prev + points);
  };
  
  // Determine earned badges based on karma points
  const badges = useMemo(() => {
    return KARMA_BADGES.filter(badge => karma >= badge.points);
  }, [karma]);

  return (
    <KarmaContext.Provider value={{ karma, badges, addKarma }}>
      {children}
    </KarmaContext.Provider>
  );
}

export function useKarma() {
  const context = useContext(KarmaContext);
  if (context === undefined) {
    throw new Error('useKarma must be used within a KarmaProvider');
  }
  return context;
}
