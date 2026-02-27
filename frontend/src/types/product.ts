export interface Product {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  waterLevel: 'low' | 'medium' | 'high';
  sunlightLevel: 'low' | 'medium' | 'bright';
  difficulty: 'easy' | 'moderate' | 'hard';
  size: string;
  potType: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface CareGuide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: number;
  image: string;
}
