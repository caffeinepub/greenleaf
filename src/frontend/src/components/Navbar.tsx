import { Link } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useScroll } from '../hooks/useScroll';
import { useState } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { itemCount } = useCart();
  const { isScrolled } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/care-guide', label: 'Care Guide' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg shadow-soft border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl sm:text-3xl font-bold text-sage-700 transition-transform duration-300 group-hover:scale-105">
                GreenLeaf
              </span>
            </Link>

            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium group"
                    activeProps={{
                      className: 'text-sage-700',
                    }}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-sage-100/50 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sage-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-in zoom-in-50 duration-300">
                    {itemCount}
                  </span>
                )}
              </button>

              {isMobile && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 hover:bg-sage-100/50 rounded-full transition-all duration-300"
                  aria-label="Menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && isMobile && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container mx-auto px-6 pt-24">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium text-foreground/80 hover:text-sage-700 transition-colors duration-300 animate-in slide-in-from-top-8 fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
