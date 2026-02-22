import { useCart } from '../context/CartContext';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Checkout() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState(1);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert('Order placed successfully! (This is a demo)');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 bg-sage-50">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-sage-900 mb-4">
            Your cart is empty
          </h1>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-sage-50">
      <div className="container mx-auto max-w-6xl">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Shop
        </Link>

        <h1 className="text-4xl font-bold text-sage-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              {/* Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        step >= s
                          ? 'bg-sage-600 text-white'
                          : 'bg-sage-100 text-sage-400'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                          step > s ? 'bg-sage-600' : 'bg-sage-100'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4 animate-in slide-in-from-right fade-in duration-500">
                    <h2 className="text-2xl font-bold text-sage-900 mb-4">
                      Contact Information
                    </h2>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-in slide-in-from-right fade-in duration-500">
                    <h2 className="text-2xl font-bold text-sage-900 mb-4">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
                      />
                      <input
                        type="text"
                        placeholder="ZIP"
                        required
                        value={formData.zip}
                        onChange={(e) =>
                          setFormData({ ...formData, zip: e.target.value })
                        }
                        className="px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-in slide-in-from-right fade-in duration-500">
                    <h2 className="text-2xl font-bold text-sage-900 mb-4">
                      Review Order
                    </h2>
                    <p className="text-foreground/70">
                      This is a demo checkout. No payment will be processed.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-300 hover:scale-105 font-medium"
                >
                  {step < 3 ? 'Continue' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              <h2 className="text-xl font-bold text-sage-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sage-800">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-sage-700">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-sage-200 pt-4 space-y-2">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-sage-900 pt-2 border-t border-sage-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
