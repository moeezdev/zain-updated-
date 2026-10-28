export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  rotation?: number;
}

const STORAGE_KEY = 'romantic_birthday_photos_v4';
const HERO_PHOTO_KEY = 'romantic_birthday_hero_photo_v4';

// Real romantic memories from uploaded photos
export const DEFAULT_MEMORIES: PhotoMemory[] = [
  {
    id: 'photo-hero-suit',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.17_0b431df5.jpeg',
    caption: 'My Batman in his Gotham suit 🖤🦇',
    date: 'Handsome Always',
    rotation: -2,
  },
  {
    id: 'photo-car-shades',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.18_d94cb974.jpeg',
    caption: 'Coolest guy in the universe 😎💕',
    date: 'Iconic Vibes',
    rotation: 2,
  },
  {
    id: 'photo-mirror-selfie',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.18__2__4be1ecd5.jpeg',
    caption: 'My favorite reflection & my whole heart 💗',
    date: 'Favorite Boy',
    rotation: -1.5,
  },
  {
    id: 'photo-car-night',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.19__1__a5b6c699.jpeg',
    caption: 'Looking breathtaking as always ✨🖤',
    date: 'Night In Gotham',
    rotation: 2.5,
  },
  {
    id: 'photo-sunroof-kisses',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.19__2__af3610b1.jpeg',
    caption: 'Kisses & sweet smiles for the birthday boy 💋',
    date: 'Pure Sweetness',
    rotation: -2.2,
  },
  {
    id: 'photo-night-stars',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.18__1__c14170f2.jpeg',
    caption: 'Looking at the stars, but my favorite star is you 🌟',
    date: 'Under The Sky',
    rotation: 1.8,
  },
  {
    id: 'photo-nature-profile',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.19_b2c9160b.jpeg',
    caption: 'My peaceful place, forever & always 🌿💖',
    date: 'Forever With You',
    rotation: -1.2,
  },
];

export const getSavedPhotos = (): PhotoMemory[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read photos from storage', e);
  }
  return DEFAULT_MEMORIES;
};

export const savePhotos = (photos: PhotoMemory[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (e) {
    console.error('Failed to save photos', e);
  }
};

export const resetToDefaultPhotos = (): PhotoMemory[] => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('romantic_birthday_photos_v2');
    localStorage.removeItem('romantic_birthday_photos_v3');
  } catch {}
  return DEFAULT_MEMORIES;
};

export const getHeroPhoto = (): string => {
  try {
    const custom = localStorage.getItem(HERO_PHOTO_KEY);
    if (custom) return custom;
  } catch {}
  return '/assets/aistudio/WhatsApp_Image_2026-10-28_at_18.51.17_0b431df5.jpeg';
};

export const saveHeroPhoto = (url: string | null): void => {
  try {
    if (url) {
      localStorage.setItem(HERO_PHOTO_KEY, url);
    } else {
      localStorage.removeItem(HERO_PHOTO_KEY);
    }
  } catch (e) {
    console.error('Failed to save hero photo', e);
  }
};
