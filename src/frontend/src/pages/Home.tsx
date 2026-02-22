import { useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronDown, Heart } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { testimonials } from '../data/testimonials';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useParallax } from '../hooks/useParallax';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const careTipsRef = useRef<HTMLDivElement>(null);
  const plantBenefitsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const isBenefitsVisible = useScrollAnimation(benefitsRef);
  const isCareTipsVisible = useScrollAnimation(careTipsRef);
  const isPlantBenefitsVisible = useScrollAnimation(plantBenefitsRef);
  const isCategoriesVisible = useScrollAnimation(categoriesRef);
  const isBestSellersVisible = useScrollAnimation(bestSellersRef);
  const isTestimonialsVisible = useScrollAnimation(testimonialsRef);
  
  const [email, setEmail] = useState('');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const parallaxOffset = useParallax(0.3);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const handleVideoError = () => {
    setVideoError(true);
    setHeroLoaded(true);
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
      {/* Hero Section with Full-Screen Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full-Screen Autoplay Video Background */}
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setHeroLoaded(true)}
            onError={handleVideoError}
            poster="/assets/generated/hero-botanical-garden.dim_1920x1080.png"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src="/assets/generated/hero-botanical-garden.dim_1920x1080.png"
            alt="Botanical garden"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-[1]" />

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-opacity duration-1000 ${
            heroLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            Bring Nature Into Your Life
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-10 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 leading-relaxed max-w-3xl mx-auto">
            Transform your space with our curated collection of beautiful indoor plants. 
            Embrace eco-friendly living and create your personal green sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 fade-in delay-300 duration-1000">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(132,169,140,0.5)] font-semibold text-lg"
            >
              Shop Plants
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/80 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] font-semibold text-lg backdrop-blur-sm"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </section>

      {/* Plant Care Tips Section with Parallax */}
      <section
        ref={careTipsRef}
        className="py-24 px-4 sm:px-6 bg-gradient-to-b from-background to-sage-50/30 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px)`,
            backgroundImage: 'url(/assets/generated/hero-leaf-1.dim_400x400.png)',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="container mx-auto max-w-6xl relative z-10">
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
                className={`glass p-8 rounded-2xl shadow-soft transition-all duration-700 hover:shadow-soft-lg hover:-translate-y-2 hover:scale-105 ${
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
                    className="w-16 h-16 object-contain transition-transform duration-300 hover:scale-110"
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
                className={`glass p-8 rounded-2xl shadow-soft transition-all duration-700 hover:shadow-soft-lg hover:-translate-y-2 hover:scale-105 ${
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
                    className="w-16 h-16 object-contain transition-transform duration-300 hover:scale-110"
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

      {/* Featured Categories with Parallax */}
      <section
        ref={categoriesRef}
        className="py-24 px-4 sm:px-6 bg-sage-50/50 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px)`,
            backgroundImage: 'url(/assets/generated/hero-leaf-2.dim_350x350.png)',
            backgroundSize: '180px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-sage-900 mb-16">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to="/shop"
                className={`group relative overflow-hidden rounded-2xl bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${
                  isCategoriesVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-sage-800 mb-2 transition-colors duration-300 group-hover:text-sage-600">
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
      <section ref={bestSellersRef} className="py-24 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-sage-900 mb-16">
            Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-700 ${
                  isBestSellersVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
                  className={`text-center p-8 rounded-2xl glass shadow-soft transition-all duration-700 hover:shadow-soft-lg hover:-translate-y-2 hover:scale-105 ${
                    isBenefitsVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
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
      <section ref={testimonialsRef} className="py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-sage-900 mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`p-6 glass rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-700 hover:-translate-y-2 hover:scale-105 ${
                  isTestimonialsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xl">
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
              className="px-8 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
