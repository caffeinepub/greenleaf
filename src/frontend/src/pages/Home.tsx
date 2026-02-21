import { useRef, useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronDown, Heart } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { testimonials } from '../data/testimonials';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const careTipsRef = useRef<HTMLDivElement>(null);
  const plantBenefitsRef = useRef<HTMLDivElement>(null);
  const isBenefitsVisible = useScrollAnimation(benefitsRef);
  const isCareTipsVisible = useScrollAnimation(careTipsRef);
  const isPlantBenefitsVisible = useScrollAnimation(plantBenefitsRef);
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const careTips = [
    {
      icon: '/assets/generated/icon-watering.dim_64x64.png',
      title: 'Watering',
      description: 'Water when the top inch of soil feels dry. Overwatering is the most common mistake—less is often more.',
    },
    {
      icon: '/assets/generated/icon-sunlight.dim_64x64.png',
      title: 'Lighting',
      description: 'Most houseplants thrive in bright, indirect light. Rotate plants weekly for even growth.',
    },
    {
      icon: '/assets/generated/icon-soil.dim_64x64.png',
      title: 'Soil & Nutrients',
      description: 'Use well-draining soil and fertilize monthly during growing season (spring and summer).',
    },
    {
      icon: '/assets/generated/icon-temperature.dim_64x64.png',
      title: 'Temperature',
      description: 'Keep plants in temperatures between 65-75°F. Avoid drafts and sudden temperature changes.',
    },
  ];

  const plantBenefits = [
    {
      icon: '/assets/generated/icon-air-purification.dim_64x64.png',
      title: 'Air Purification',
      description: 'Plants naturally filter toxins and improve indoor air quality, creating a healthier living space.',
    },
    {
      icon: '/assets/generated/icon-stress-relief.dim_64x64.png',
      title: 'Stress Reduction',
      description: 'Studies show that being around plants reduces stress levels and promotes mental well-being.',
    },
    {
      icon: '/assets/generated/icon-productivity.dim_64x64.png',
      title: 'Productivity Boost',
      description: 'Indoor plants enhance focus and creativity, making them perfect for home offices and workspaces.',
    },
    {
      icon: '/assets/generated/icon-wellness.dim_64x64.png',
      title: 'Overall Wellness',
      description: 'Plants increase humidity, reduce fatigue, and create a calming atmosphere for better health.',
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Static Botanical Image Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Static Botanical Image Background */}
        <img
          src="/assets/generated/hero-botanical-garden.dim_1920x1080.png"
          alt="Botanical garden with multiple plants"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Floating Leaf Elements with Parallax */}
        <img
          src="/assets/generated/hero-leaf-1.dim_400x400.png"
          alt=""
          className="absolute top-20 right-10 w-32 h-32 opacity-20 animate-float-slow pointer-events-none z-[2]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <img
          src="/assets/generated/hero-leaf-2.dim_350x350.png"
          alt=""
          className="absolute bottom-32 left-16 w-28 h-28 opacity-15 animate-float-medium pointer-events-none z-[2]"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <img
          src="/assets/generated/hero-leaf-1.dim_400x400.png"
          alt=""
          className="absolute top-1/3 left-1/4 w-24 h-24 opacity-10 animate-float-fast pointer-events-none hidden md:block z-[2]"
          style={{ transform: `translateY(${scrollY * 0.4}px) rotate(45deg)` }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 animate-in slide-in-from-bottom-8 fade-in duration-1000"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4)' }}
          >
            Bring Nature Home
          </h1>
          <p 
            className="text-xl sm:text-2xl text-white/90 mb-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}
          >
            Discover our curated collection of beautiful, healthy plants
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-500 hover:scale-105 hover:shadow-lg font-medium animate-in slide-in-from-bottom-8 fade-in delay-300"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))' }} />
        </div>
      </section>

      {/* Plant Care Tips Section */}
      <section ref={careTipsRef} className="py-24 px-4 sm:px-6 bg-gradient-to-b from-background to-sage-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">
              Essential Plant Care Tips
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Master the basics of plant care with our expert guidance
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careTips.map((tip, index) => (
              <div
                key={index}
                className={`glass p-8 rounded-2xl shadow-soft transition-all duration-700 hover:shadow-soft-lg hover:-translate-y-1 ${
                  isCareTipsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={tip.icon}
                    alt={tip.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-3 text-center">
                  {tip.title}
                </h3>
                <p className="text-foreground/70 text-center leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indoor Plant Benefits Section */}
      <section ref={plantBenefitsRef} className="py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">
              Benefits of Indoor Plants
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Transform your space and well-being with the power of plants
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plantBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`glass p-8 rounded-2xl shadow-soft transition-all duration-700 hover:shadow-soft-lg hover:-translate-y-1 ${
                  isPlantBenefitsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={benefit.icon}
                    alt={benefit.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 sm:px-6 bg-sage-50/50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-sage-900 mb-16">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to="/shop"
                className="group relative overflow-hidden rounded-2xl bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-in slide-in-from-bottom-8 fade-in"
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
      <section className="py-24 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-sage-900 mb-16">
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
      <section ref={benefitsRef} className="py-24 px-4 sm:px-6 bg-sage-50/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Eco-Friendly',
                description: 'Sustainably sourced and packaged with care',
              },
              {
                icon: ArrowRight,
                title: 'Free Shipping',
                description: 'On orders over $50 across the US',
              },
              {
                icon: Heart,
                title: 'Care Guides',
                description: 'Expert tips to help your plants thrive',
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-8 rounded-2xl glass shadow-soft transition-all duration-700 ${
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
      <section className="py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-sage-900 mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="p-6 glass rounded-2xl shadow-soft animate-in slide-in-from-bottom-8 fade-in hover:shadow-soft-lg transition-all duration-300"
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
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-sage-50/30 to-background">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Join Our Green Community
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
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
