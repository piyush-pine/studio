
export interface Temple {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  tags: string[];
  location: {
    lat: number;
    lng: number;
    city: string;
  };
}

export const temples: Temple[] = [
  {
    id: '1',
    name: 'Golden Temple of Varanasi',
    description: 'A beacon of spiritual light on the banks of the Ganges.',
    longDescription: 'The Golden Temple of Varanasi, dedicated to Lord Shiva, is one of the most revered pilgrimage sites in Hinduism. Its spires are plated with gold, a gift from Maharaja Ranjit Singh. The temple complex is a bustling center of faith, attracting devotees from all over the world who come to seek blessings and perform sacred rituals.',
    image: 'https://placehold.co/600x400',
    images: [
      'https://placehold.co/800x600',
      'https://placehold.co/800x601',
      'https://placehold.co/800x602',
    ],
    tags: ['Shiva', 'Pilgrimage', 'Ganges'],
    location: { lat: 25.3109, lng: 83.0104, city: 'Varanasi' },
  },
  {
    id: '2',
    name: 'Sunstone Monastery',
    description: 'A serene sanctuary nestled in the Himalayan foothills.',
    longDescription: 'The Sunstone Monastery is a place of profound peace and meditation. Carved into the mountainside, it offers breathtaking views and a tranquil atmosphere for spiritual seekers. The monastery is home to ancient scriptures and hosts regular teachings on Vedic philosophy.',
    image: 'https://placehold.co/600x401',
    images: [
      'https://placehold.co/800x603',
      'https://placehold.co/800x604',
      'https://placehold.co/800x605',
    ],
    tags: ['Meditation', 'Philosophy', 'Himalayas'],
    location: { lat: 30.3165, lng: 78.0322, city: 'Dehradun' },
  },
  {
    id: '3',
    name: 'Emerald Buddha Temple',
    description: 'A southern gem known for its intricate carvings.',
    longDescription: 'Located in the heart of the south, the Emerald Buddha Temple is an architectural marvel. Its walls are adorned with detailed sculptures depicting tales from the Ramayana and Mahabharata. The central deity, carved from a single emerald, is a source of immense spiritual power.',
    image: 'https://placehold.co/600x402',
    images: [
      'https://placehold.co/800x606',
      'https://placehold.co/800x607',
      'https://placehold.co/800x608',
    ],
    tags: ['Vishnu', 'Architecture', 'Sculpture'],
    location: { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
  },
  {
    id: '4',
    name: 'Temple of Divine Echoes',
    description: 'Where ancient chants resonate through desert sands.',
    longDescription: 'In the vast expanse of the western desert lies the Temple of Divine Echoes. Built from the local sandstone, it glows with a golden hue at sunrise and sunset. The temple is famous for its acoustics, where prayers and chants seem to linger in the air for eternity.',
    image: 'https://placehold.co/600x403',
    images: [
      'https://placehold.co/800x609',
      'https://placehold.co/800x610',
      'https://placehold.co/800x611',
    ],
    tags: ['Shakti', 'Desert', 'Sound Healing'],
    location: { lat: 26.9124, lng: 75.7873, city: 'Jaipur' },
  },
  {
    id: '5',
    name: 'Lotus Sanctuary of the East',
    description: 'A symbol of purity and enlightenment in the eastern highlands.',
    longDescription: 'This temple, shaped like a blooming lotus, is a modern architectural wonder dedicated to peace and universal brotherhood. It is surrounded by lush gardens and reflecting pools, creating a serene environment for contemplation.',
    image: 'https://placehold.co/600x404',
    images: [
      'https://placehold.co/800x612',
      'https://placehold.co/800x613',
      'https://placehold.co/800x614',
    ],
    tags: ['Modern', 'Peace', 'Community'],
    location: { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
  },
  {
    id: '6',
    name: 'The Crystal Cave Shrine',
    description: 'A sacred cave temple in the heart of the central plateau.',
    longDescription: 'Hidden within a network of natural caves, this shrine is home to a naturally formed crystal lingam. Devotees undertake a pilgrimage to witness this marvel and meditate in the powerful energy of the earth.',
    image: 'https://placehold.co/600x405',
    images: [
      'https://placehold.co/800x615',
      'https://placehold.co/800x616',
      'https://placehold.co/800x617',
    ],
    tags: ['Shiva', 'Natural Wonder', 'Meditation'],
    location: { lat: 17.3850, lng: 78.4867, city: 'Hyderabad' },
  }
];

export const getTempleById = (id: string): Temple | undefined => {
  return temples.find((temple) => temple.id === id);
};
