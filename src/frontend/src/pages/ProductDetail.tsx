import { useParams, Link } from '@tanstack/react-router';
import { products } from '../data/products';
import { ArrowLeft, Droplet, Sun, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import WishlistButton from '../components/WishlistButton';
import { useState } from 'react';

export default function ProductDetail() {
  const { productId } = useParams({ from: '/product/$productId' });
  const product = products.find((p) => p.id === productId);
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 bg-sage-50">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-sage-900 mb-4">
            Product not found
          </h1>
          <Link
            to="/shop"
            className="text-sage-600 hover:text-sage-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-sage-50">
      <div className="container mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="animate-in slide-in-from-left fade-in duration-700">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="animate-in slide-in-from-right fade-in duration-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-sage-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-foreground/60 italic">
                  {product.scientificName}
                </p>
              </div>
              <WishlistButton productId={product.id} />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-foreground/60">({product.rating})</span>
            </div>

            <p className="text-3xl font-bold text-sage-700 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-foreground/70 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Care Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl animate-in zoom-in-50 duration-500 delay-200">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Water</p>
                  <p className="font-semibold text-sage-800 capitalize">
                    {product.waterLevel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl animate-in zoom-in-50 duration-500 delay-300">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Sunlight</p>
                  <p className="font-semibold text-sage-800 capitalize">
                    {product.sunlightLevel}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-300 hover:scale-105 font-medium flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {addedToCart ? (
                <span className="animate-in zoom-in-50 duration-300">
                  Added to Cart! ✓
                </span>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Additional Info */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-white rounded-xl">
                <h3 className="font-semibold text-sage-800 mb-2">Size</h3>
                <p className="text-foreground/70">{product.size}</p>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <h3 className="font-semibold text-sage-800 mb-2">Difficulty</h3>
                <p className="text-foreground/70 capitalize">
                  {product.difficulty}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-sage-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to="/product/$productId"
                  params={{ productId: relatedProduct.id }}
                  className="group animate-in slide-in-from-bottom-8 fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sage-800">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sage-700 font-medium">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
