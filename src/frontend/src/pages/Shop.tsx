import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedWaterLevel, setSelectedWaterLevel] = useState<string>('all');
  const [selectedSunlight, setSelectedSunlight] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useIsMobile();

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (selectedWaterLevel !== 'all' && product.waterLevel !== selectedWaterLevel) return false;
      if (selectedSunlight !== 'all' && product.sunlightLevel !== selectedSunlight) return false;
      return true;
    });
  }, [selectedCategory, priceRange, selectedWaterLevel, selectedSunlight]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sage-800 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-sage-600 text-white'
                  : 'bg-sage-50 text-foreground/70 hover:bg-sage-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sage-800 mb-3">Water Level</h3>
        <div className="space-y-2">
          {['all', 'low', 'medium', 'high'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedWaterLevel(level)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedWaterLevel === level
                  ? 'bg-sage-600 text-white'
                  : 'bg-sage-50 text-foreground/70 hover:bg-sage-100'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sage-800 mb-3">Sunlight</h3>
        <div className="space-y-2">
          {['all', 'low', 'medium', 'bright'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedSunlight(level)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedSunlight === level
                  ? 'bg-sage-600 text-white'
                  : 'bg-sage-50 text-foreground/70 hover:bg-sage-100'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-sage-900 mb-4">
            Shop All Plants
          </h1>
          <p className="text-foreground/70">
            Discover our complete collection of beautiful, healthy plants
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <aside className="w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold text-sage-800 mb-6">Filters</h2>
                <FilterContent />
              </div>
            </aside>
          )}

          {/* Mobile Filter Button */}
          {isMobile && (
            <button
              onClick={() => setIsFilterOpen(true)}
              className="fixed bottom-6 right-6 z-40 p-4 bg-sage-600 text-white rounded-full shadow-lg hover:bg-sage-700 transition-all duration-300 hover:scale-110"
            >
              <Filter className="w-6 h-6" />
            </button>
          )}

          {/* Mobile Filter Drawer */}
          {isMobile && isFilterOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 w-80 bg-background z-50 p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-sage-800">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-sage-100 rounded-full transition-all duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <FilterContent />
              </div>
            </>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 text-foreground/60">
              Showing {filteredProducts.length} products
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in slide-in-from-bottom-8 fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
