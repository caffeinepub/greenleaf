import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface LoadingLandingPageProps {
  onComplete: () => void;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100 + 10,
    size: Math.random() * 28 + 14,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: -(Math.random() * 0.4 + 0.15),
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.2,
    opacity: Math.random() * 0.45 + 0.15,
  }));
}

/**
 * Creates a processed version of the leaf image with the white background removed.
 * Uses an offscreen canvas: draws the image, then applies a radial gradient mask
 * via 'destination-in' composite operation so only the leaf shape remains.
 */
function createMaskedLeafCanvas(img: HTMLImageElement, size: number): HTMLCanvasElement {
  const offscreen = document.createElement('canvas');
  offscreen.width = size;
  offscreen.height = size;
  const ctx = offscreen.getContext('2d');
  if (!ctx) return offscreen;

  // Draw the leaf image
  ctx.drawImage(img, 0, 0, size, size);

  // Use 'destination-in' to keep only pixels where the mask is opaque.
  // We draw a radial gradient ellipse as the mask — this removes the white
  // rectangular background by only preserving the leaf-shaped center region.
  ctx.globalCompositeOperation = 'destination-in';
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, size * 0.05,
    size / 2, size / 2, size * 0.48
  );
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(0.7, 'rgba(0,0,0,0.95)');
  gradient.addColorStop(0.88, 'rgba(0,0,0,0.5)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return offscreen;
}

export default function LoadingLandingPage({ onComplete }: LoadingLandingPageProps) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const [logoVisible, setLogoVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [subtextVisible, setSubtextVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particleStateRef = useRef<Particle[]>(generateParticles(18));
  // Guard so onComplete is only ever called once
  const completedRef = useRef(false);
  // Cache of masked leaf canvases keyed by size (rounded to nearest 4px)
  const maskedLeafCacheRef = useRef<Map<number, HTMLCanvasElement>>(new Map());

  const triggerComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const leafImg = new Image();
    leafImg.src = '/assets/generated/leaf-particles-sheet.dim_512x512.png';

    let running = true;

    const getMaskedLeaf = (size: number): HTMLCanvasElement | null => {
      if (!leafImg.complete || leafImg.naturalWidth === 0) return null;
      // Round size to nearest 4px bucket to limit cache entries
      const bucket = Math.round(size / 4) * 4;
      if (!maskedLeafCacheRef.current.has(bucket)) {
        maskedLeafCacheRef.current.set(bucket, createMaskedLeafCanvas(leafImg, bucket));
      }
      return maskedLeafCacheRef.current.get(bucket) ?? null;
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particleStateRef.current.forEach(p => {
        ctx.save();
        const px = (p.x / 100) * canvas.width;
        const py = (p.y / 100) * canvas.height;
        ctx.globalAlpha = p.opacity;
        ctx.translate(px, py);
        ctx.rotate((p.rotation * Math.PI) / 180);

        const maskedLeaf = getMaskedLeaf(Math.round(p.size));

        if (maskedLeaf) {
          // Draw the pre-masked leaf — no white background
          ctx.drawImage(maskedLeaf, -p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          // Fallback: draw a simple green ellipse while image loads
          ctx.fillStyle = 'rgba(72, 120, 72, 0.6)';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 2, p.size / 3.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Update position
        p.x += p.speedX * 0.4;
        p.y += p.speedY * 0.4;
        p.rotation += p.rotationSpeed * 0.5;

        // Wrap around
        if (p.y < -5) p.y = 105;
        if (p.x < -5) p.x = 105;
        if (p.x > 105) p.x = -5;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    // Start drawing immediately; image will render once loaded
    draw();
    leafImg.onload = () => {
      // Clear the cache so new masked versions are generated with the loaded image
      maskedLeafCacheRef.current.clear();
    };

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Orchestrate animation sequence
  useEffect(() => {
    // Stage 1 – logo fades in
    const t1 = setTimeout(() => setLogoVisible(true), 300);
    // Stage 2 – tagline appears
    const t2 = setTimeout(() => setTaglineVisible(true), 900);
    // Stage 3 – subtext appears
    const t3 = setTimeout(() => setSubtextVisible(true), 1400);

    // Progress bar fills from 600 ms → ~3 000 ms
    let progressInterval: ReturnType<typeof setInterval> | null = null;
    const progressStart = setTimeout(() => {
      setProgressWidth(0);
      progressInterval = setInterval(() => {
        setProgressWidth(prev => {
          if (prev >= 100) {
            if (progressInterval) clearInterval(progressInterval);
            return 100;
          }
          return prev + 1.8;
        });
      }, 40);
    }, 600);

    // Stage 4 – begin exit fade/scale
    const t4 = setTimeout(() => setPhase('exit'), 3200);

    // Stage 5 – exit animation has played (~700 ms); notify parent
    const t5 = setTimeout(() => triggerComplete(), 3950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(progressStart);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [triggerComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all
        ${phase === 'exit' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
      `}
      style={{
        background: 'linear-gradient(160deg, oklch(0.94 0.04 140) 0%, oklch(0.97 0.02 100) 40%, oklch(0.95 0.03 140) 100%)',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Canvas for floating leaf particles — white backgrounds removed via offscreen canvas masking */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Radial glow behind logo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, oklch(0.78 0.08 140 / 0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Decorative rings */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          width: '380px',
          height: '380px',
          borderColor: 'oklch(0.68 0.08 140 / 0.18)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'ringPulse 3s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          width: '480px',
          height: '480px',
          borderColor: 'oklch(0.68 0.08 140 / 0.10)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'ringPulse 3s ease-in-out infinite 0.5s',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">

        {/* Central leaf logo */}
        <div
          className={`transition-all duration-1000 ${logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          style={{
            animation: logoVisible ? 'leafBreathe 4s ease-in-out infinite' : 'none',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className="relative">
            {/* Soft glow ring behind image */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, oklch(0.68 0.10 140 / 0.3) 0%, transparent 70%)',
                filter: 'blur(16px)',
                transform: 'scale(1.3)',
              }}
            />
            <img
              src="/assets/generated/greenleaf-logo-leaf.dim_256x256.png"
              alt="GreenLeaf Logo"
              className="relative"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 24px oklch(0.48 0.12 140 / 0.4))',
              }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div
          className={`transition-all duration-700 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              color: 'oklch(0.28 0.10 140)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Green<span style={{ color: 'oklch(0.48 0.12 140)' }}>Leaf</span>
          </h1>
        </div>

        {/* Tagline */}
        <div
          className={`transition-all duration-700 ${taglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p
            className="font-light tracking-widest uppercase"
            style={{
              fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
              color: 'oklch(0.48 0.10 140)',
              letterSpacing: '0.25em',
            }}
          >
            Bring Nature Home
          </p>
        </div>

        {/* Divider */}
        <div
          className={`transition-all duration-700 ${taglineVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
          style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, oklch(0.58 0.10 140), transparent)',
            transitionDelay: '100ms',
          }}
        />

        {/* Subtext */}
        <div
          className={`transition-all duration-700 ${subtextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <p
            style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
              color: 'oklch(0.52 0.07 140)',
              maxWidth: '280px',
              lineHeight: 1.6,
            }}
          >
            Curated plants for every space, every soul
          </p>
        </div>

        {/* Progress bar */}
        <div
          className={`transition-all duration-500 ${subtextVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '200px', marginTop: '8px' }}
        >
          <div
            className="rounded-full overflow-hidden"
            style={{
              height: '3px',
              background: 'oklch(0.88 0.04 140)',
            }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progressWidth}%`,
                background: 'linear-gradient(90deg, oklch(0.68 0.08 140), oklch(0.48 0.12 140))',
                transitionDuration: '80ms',
                transitionTimingFunction: 'linear',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom decorative leaves */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: '180px' }}>
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-30px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(ellipse, oklch(0.78 0.08 140 / 0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'float-slow 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-30px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(ellipse, oklch(0.72 0.05 80 / 0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'float-slow 9s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Top corner accents */}
      <div className="absolute top-0 left-0 pointer-events-none" style={{ width: '300px', height: '300px' }}>
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, oklch(0.78 0.08 140 / 0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none" style={{ width: '300px', height: '300px' }}>
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, oklch(0.82 0.04 80 / 0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>
    </div>
  );
}
