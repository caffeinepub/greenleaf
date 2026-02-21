import { careGuides } from '../data/careGuides';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CareGuide() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-sage-200 z-50">
        <div
          className="h-full bg-sage-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-sage-900 mb-4 animate-in slide-in-from-bottom-8 fade-in">
            Plant Care Guide
          </h1>
          <p className="text-xl text-foreground/70 mb-12 animate-in slide-in-from-bottom-8 fade-in delay-100">
            Expert tips and advice to help your plants thrive
          </p>

          <div className="space-y-8">
            {careGuides.map((guide, index) => (
              <article
                key={guide.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium">
                        {guide.category}
                      </span>
                      <div className="flex items-center gap-1 text-foreground/60 text-sm">
                        <Clock className="w-4 h-4" />
                        {guide.readingTime} min read
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-sage-900 mb-3">
                      {guide.title}
                    </h2>
                    <p className="text-foreground/70 mb-4 leading-relaxed">
                      {guide.excerpt}
                    </p>
                    <button className="text-sage-600 hover:text-sage-700 font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
