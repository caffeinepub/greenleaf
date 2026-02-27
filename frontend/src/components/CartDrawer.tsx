import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from '@tanstack/react-router';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-sage-50 shadow-2xl z-50 transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-sage-200/50 bg-sage-100/50">
            <h2 className="text-2xl font-bold text-sage-800">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sage-200/70 rounded-full transition-all duration-300 hover:rotate-90"
              aria-label="Close cart"
            >
              <X className="w-6 h-6 text-sage-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-sage-50">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <ShoppingBag className="w-16 h-16 text-sage-300" />
                <p className="text-sage-600">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-300 hover:scale-105"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-white/80 rounded-xl animate-in slide-in-from-right-8 fade-in duration-300 border border-sage-200/30"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sage-800">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-sage-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-sage-200/70 rounded transition-all duration-200 hover:scale-110"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-sage-700" />
                        </button>
                        <span className="w-8 text-center font-medium text-sage-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-sage-200/70 rounded transition-all duration-200 hover:scale-110"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-sage-700" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-sage-400 hover:text-destructive transition-colors duration-200"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-sage-200/50 p-6 space-y-4 bg-sage-100/50">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-sage-800">Subtotal</span>
                <span className="text-sage-700">${subtotal.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full py-3 bg-sage-600 text-white text-center rounded-full hover:bg-sage-700 transition-all duration-300 hover:scale-105 font-medium"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
