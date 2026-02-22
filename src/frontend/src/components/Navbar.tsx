import { Link } from '@tanstack/react-router';
import { ShoppingCart, Menu, X } from 'lucide-react';
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
            ? 'bg-background/70 backdrop-blur-xl shadow-soft border-b border-sage-200/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <span
                className={`text-2xl sm:text-3xl font-bold transition-all duration-500 group-hover:scale-105 ${
                  isScrolled ? 'text-sage-800' : 'text-white drop-shadow-lg'
                }`}
              >
                GreenLife
              </span>
            </Link>

            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative font-medium transition-all duration-300 group ${
                      isScrolled
                        ? 'text-foreground/80 hover:text-sage-700'
                        : 'text-white/90 hover:text-white'
                    }`}
                    activeProps={{
                      className: isScrolled ? 'text-sage-700' : 'text-white',
                    }}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isScrolled ? 'bg-sage-600' : 'bg-white'
                      }`}
                    />
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button
                onClick={onCartClick}
                className={`relative p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'hover:bg-sage-100'
                    : 'hover:bg-white/10 backdrop-blur-sm'
                }`}
                aria-label="Shopping cart"
              >
                <ShoppingCart
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isScrolled ? 'text-foreground/80' : 'text-white'
                  }`}
                />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sage-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </button>

              {isMobile && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'hover:bg-sage-100'
                      : 'hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isScrolled ? 'text-foreground/80' : 'text-white'
                      }`}
                    />
                  ) : (
                    <Menu
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isScrolled ? 'text-foreground/80' : 'text-white'
                      }`}
                    />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-64 bg-background shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 pt-24 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground/80 hover:text-sage-700 transition-colors duration-300"
                activeProps={{
                  className: 'text-sage-700',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
