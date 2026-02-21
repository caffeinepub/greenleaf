import { Link } from '@tanstack/react-router';
import { Product } from '../types/product';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import WishlistButton from './WishlistButton';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <Link to="/product/$productId" params={{ productId: product.id }}>
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 z-10">
            <WishlistButton productId={product.id} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-sage-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-sage-600 hover:text-white flex items-center gap-2 font-medium shadow-lg translate-y-4 group-hover:translate-y-0"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sage-800 mb-1 group-hover:text-sage-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-foreground/60 mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-sage-700">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-amber-400">★</span>
              <span className="text-sm text-foreground/60">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
