export interface Temple {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
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
      'https://placehold.co/800x600',
      'https://placehold.co/800x600',
    ],
    location: { lat: 25.3109, lng: 83.0104, city: 'Varanasi' },
  },
  {
    id: '2',
    name: 'Sunstone Monastery',
    description: 'A serene sanctuary nestled in the Himalayan foothills.',
    longDescription: 'The Sunstone Monastery is a place of profound peace and meditation. Carved into the mountainside, it offers breathtaking views and a tranquil atmosphere for spiritual seekers. The monastery is home to ancient scriptures and hosts regular teachings on Vedic philosophy.',
    image: 'https://placehold.co/600x400',
    images: [
      'https://placehold.co/800x600',
      'https://placehold.co/800x600',
      'https://placehold.co/800x600',
    ],
    location: { lat: 30.3165, lng: 78.0322, city: 'Dehradun' },
  },
  {
    id: '3',
    name: 'Emerald Buddha Temple',
    description: 'A southern gem known for its intricate carvings.',
    longDescription: 'Located in the heart of the south, the Emerald Buddha Temple is an architectural marvel. Its walls are adorned with detailed sculptures depicting tales from the Ramayana and Mahabharata. The central deity, carved from a single emerald, is a source of immense spiritual power.',
    image: 'https://placehold.co/600x400',
    images: [
      'https://placehold.co/800x600',
      'https://placehold.co/800x600',
      'https://placehold.co/800x600',
    ],
    location: { lat: 13.0827, lng: 80.2707, city: 'Chennai' },
  },
  {
    id: '4',
    name: 'Temple of Divine Echoes',
    description: 'Where ancient chants resonate through desert sands.',
    longDescription: 'In the vast expanse of the western desert lies the Temple of Divine Echoes. Built from the local sandstone, it glows with a golden hue at sunrise and sunset. The temple is famous for its acoustics, where prayers and chants seem to linger in the air for eternity.',
    image: 'https://placehold.co/600x400',
    images: [
      'https://placehold.co/800x600',
      'https://placehold.co/800x600',
      'https://placehold.co/800x600',
    ],
    location: { lat: 26.9124, lng: 75.7873, city: 'Jaipur' },
  },
];

export const getTempleById = (id: string): Temple | undefined => {
  return temples.find((temple) => temple.id === id);
};
