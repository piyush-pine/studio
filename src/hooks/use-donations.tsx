'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export interface Donation {
  id: string;
  templeId: string;
  templeName: string;
  amount: number;
  date: string;
  transactionId: string;
}

interface DonationsContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id'>) => void;
}

const DonationsContext = createContext<DonationsContextType | undefined>(
  undefined
);

export function DonationsProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedDonations = localStorage.getItem('dharma-donations');
      if (storedDonations) {
        setDonations(JSON.parse(storedDonations));
      }
    } catch (error) {
      console.error('Failed to load donations from localStorage', error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('dharma-donations', JSON.stringify(donations));
      } catch (error) {
        console.error('Failed to save donations to localStorage', error);
      }
    }
  }, [donations, isInitialized]);

  const addDonation = (donation: Omit<Donation, 'id'>) => {
    setDonations((prev) => [
      { ...donation, id: new Date().toISOString() },
      ...prev,
    ]);
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationsContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationsProvider');
  }
  return context;
}
