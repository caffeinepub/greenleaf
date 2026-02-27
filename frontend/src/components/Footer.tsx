import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'greenleaf-app'
  );

  return (
    <footer className="bg-sage-50 border-t border-sage-200/50">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-sage-800 mb-4">GreenLeaf</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Bringing nature into your home, one plant at a time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sage-800 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/shop" className="text-foreground/70 hover:text-sage-700 transition-colors">
                  All Plants
                </a>
              </li>
              <li>
                <a href="/shop" className="text-foreground/70 hover:text-sage-700 transition-colors">
                  Succulents
                </a>
              </li>
              <li>
                <a href="/shop" className="text-foreground/70 hover:text-sage-700 transition-colors">
                  Tropical Plants
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sage-800 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/care-guide" className="text-foreground/70 hover:text-sage-700 transition-colors">
                  Care Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-sage-700 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-sage-700 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sage-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-foreground/70 hover:text-sage-700 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-sage-700 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-sage-700 transition-all duration-300 hover:scale-110"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-200/50 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-foreground/60">
            © {currentYear} GreenLeaf. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60 flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-700 hover:text-sage-800 font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
