
export interface TempleEvent {
  id: string;
  name: string;
  temple: string;
  templeId: string;
  date: string;
  description: string;
  image: string;
}

export const events: TempleEvent[] = [
  {
    id: 'evt1',
    name: 'Diwali Celebration',
    temple: 'Golden Temple of Varanasi',
    templeId: '1',
    date: '2024-11-01',
    description: 'Join us for the festival of lights with special prayers and a grand lamp lighting ceremony.',
    image: 'https://placehold.co/600x400'
  },
  {
    id: 'evt2',
    name: 'Holi - Festival of Colors',
    temple: 'Temple of Divine Echoes',
    templeId: '4',
    date: '2025-03-14',
    description: 'Celebrate the arrival of spring with vibrant colors, music, and devotional songs.',
    image: 'https://placehold.co/600x400'
  },
  {
    id: 'evt3',
    name: 'Vedic Chanting Week',
    temple: 'Sunstone Monastery',
    templeId: '2',
    date: '2024-09-10',
    description: 'A week-long event dedicated to the chanting of ancient Vedic hymns for peace and prosperity.',
    image: 'https://placehold.co/600x400'
  },
  {
    id: 'evt4',
    name: 'Maha Shivaratri',
    temple: 'Golden Temple of Varanasi',
    templeId: '1',
    date: '2025-02-26',
    description: 'An all-night vigil and worship of Lord Shiva, marking a major festival in the Hindu calendar.',
    image: 'https://placehold.co/600x400'
  },
  {
    id: 'evt5',
    name: 'Temple Anniversary Puja',
    temple: 'Emerald Buddha Temple',
    templeId: '3',
    date: '2024-12-05',
    description: 'Special rituals and cultural programs to celebrate the founding day of the temple.',
    image: 'https://placehold.co/600x400'
  }
];

export const getUpcomingEvents = (): TempleEvent[] => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return events
        .filter(event => new Date(event.date) >= today)
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
