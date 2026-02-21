import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Leaf, Truck, BookOpen, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { testimonials } from '../data/testimonials';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function Home() {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const isBenefitsVisible = useScrollAnimation(benefitsRef);
  const [email, setEmail] = useState('');

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-sage-100 via-beige-100 to-sage-50"
          style={{
            animation: 'gradientShift 15s ease infinite',
          }}
        />
        
        <img
          src="/assets/generated/hero-plants.dim_1920x1080.png"
          alt="Lush plants"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <img
          src="/assets/generated/monstera-float.dim_400x400.png"
          alt="Floating leaf"
          className="absolute top-20 right-10 w-32 h-32 opacity-20 animate-float"
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-sage-900 mb-6 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            Bring Nature Home
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/70 mb-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200">
            Discover our curated collection of beautiful, healthy plants
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-500 hover:scale-105 hover:shadow-lg font-medium animate-in slide-in-from-bottom-8 fade-in delay-300"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-sage-600" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-sage-900 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to="/shop"
                className="group relative overflow-hidden rounded-2xl bg-sage-50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-in slide-in-from-bottom-8 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4 sm:px-6 bg-sage-50/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-sage-900 mb-12">
            Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-in slide-in-from-bottom-8 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Eco-Friendly',
                description: 'Sustainably sourced and packaged with care',
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'On orders over $50 across the US',
              },
              {
                icon: BookOpen,
                title: 'Care Guides',
                description: 'Expert tips to help your plants thrive',
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-8 rounded-2xl bg-white shadow-soft transition-all duration-700 ${
                    isBenefitsVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-sage-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/60">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 bg-sage-50/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-sage-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="p-6 bg-white rounded-2xl shadow-soft animate-in slide-in-from-bottom-8 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground/70 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-sage-800">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-sage-900 mb-4">
            Join Our Green Community
          </h2>
          <p className="text-foreground/70 mb-8">
            Get plant care tips, exclusive offers, and new arrivals delivered to
            your inbox
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 rounded-full border border-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-300 hover:scale-105 font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
