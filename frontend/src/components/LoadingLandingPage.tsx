import { useEffect, useRef, useState, useCallback } from 'react';

interface Shape {
  id: number;
  x: number;       // 0–100 (% of canvas)
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  sides: number;   // 3 = triangle, 4 = diamond, 6 = hexagon
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface LoadingLandingPageProps {
  onComplete: () => void;
}

// Sage green and beige palette (literal values for Canvas API)
const COLORS = [
  { r: 139, g: 157, b: 131 }, // sage green  #8B9D83
  { r: 168, g: 184, b: 157 }, // light sage  #A8B89D
  { r: 232, g: 223, b: 208 }, // beige       #E8DFD0
  { r: 200, g: 190, b: 170 }, // warm beige  #C8BEAD
  { r: 110, g: 130, b: 100 }, // deep sage   #6E8264
];

function generateShapes(count: number): Shape[] {
  const sideOptions = [3, 4, 6];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.10,
    size: Math.random() * 22 + 10,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.008,
    sides: sideOptions[Math.floor(Math.random() * sideOptions.length)],
    opacity: Math.random() * 0.35 + 0.12,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.02 + 0.01,
  }));
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotation: number
) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = rotation + (i * Math.PI * 2) / sides;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export default function LoadingLandingPage({ onComplete }: LoadingLandingPageProps) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const [logoVisible, setLogoVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [subtextVisible, setSubtextVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const shapesRef = useRef<Shape[]>(generateShapes(22));
  const completedRef = useRef(false);
  const timeRef = useRef(0);

  const triggerComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Canvas geometric animation
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

    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const shapes = shapesRef.current;
      timeRef.current += 1;

      // Draw connecting lines between nearby shapes
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const a = shapes[i];
          const b = shapes[j];
          const ax = (a.x / 100) * canvas.width;
          const ay = (a.y / 100) * canvas.height;
          const bx = (b.x / 100) * canvas.width;
          const by = (b.y / 100) * canvas.height;
          const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
          const maxDist = 160;
          if (dist < maxDist) {
            const lineOpacity = (1 - dist / maxDist) * 0.18;
            const col = COLORS[1]; // light sage for lines
            ctx.save();
            ctx.globalAlpha = lineOpacity;
            ctx.strokeStyle = `rgb(${col.r},${col.g},${col.b})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw shapes
      shapes.forEach(s => {
        const px = (s.x / 100) * canvas.width;
        const py = (s.y / 100) * canvas.height;
        const pulse = 1 + 0.12 * Math.sin(timeRef.current * s.pulseSpeed + s.pulsePhase);
        const radius = s.size * pulse;
        const col = randomColorForShape(s.id);

        ctx.save();
        ctx.globalAlpha = s.opacity;

        // Filled polygon (very subtle)
        drawPolygon(ctx, px, py, radius, s.sides, s.rotation);
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},0.18)`;
        ctx.fill();

        // Stroked polygon outline
        drawPolygon(ctx, px, py, radius, s.sides, s.rotation);
        ctx.strokeStyle = `rgb(${col.r},${col.g},${col.b})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Small dot at center
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${col.r},${col.g},${col.b})`;
        ctx.fill();

        ctx.restore();

        // Update position
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;

        // Wrap around edges
        if (s.x < -5) s.x = 105;
        if (s.x > 105) s.x = -5;
        if (s.y < -5) s.y = 105;
        if (s.y > 105) s.y = -5;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Orchestrate animation sequence
  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 300);
    const t2 = setTimeout(() => setTaglineVisible(true), 900);
    const t3 = setTimeout(() => setSubtextVisible(true), 1400);

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

    const t4 = setTimeout(() => setPhase('exit'), 3200);
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
      {/* Canvas for abstract geometric animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.85 }}
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

        {/* Spinner replacing the leaf image */}
        <div
          className={`transition-all duration-1000 ${logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className="relative flex items-center justify-center" style={{ width: '120px', height: '120px' }}>
            {/* Soft glow behind spinner */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, oklch(0.68 0.10 140 / 0.3) 0%, transparent 70%)',
                filter: 'blur(16px)',
                transform: 'scale(1.3)',
              }}
            />
            {/* Outer spinner ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: '110px',
                height: '110px',
                border: '3px solid oklch(0.88 0.05 140)',
                borderTopColor: 'oklch(0.48 0.12 140)',
                borderRightColor: 'oklch(0.58 0.10 140)',
                animation: 'spin 1.4s linear infinite',
              }}
            />
            {/* Inner spinner ring (counter-rotate) */}
            <div
              className="absolute rounded-full"
              style={{
                width: '80px',
                height: '80px',
                border: '2px solid oklch(0.90 0.04 100)',
                borderTopColor: 'oklch(0.62 0.08 100)',
                borderLeftColor: 'oklch(0.72 0.06 100)',
                animation: 'spin 2s linear infinite reverse',
              }}
            />
            {/* Center dot */}
            <div
              className="absolute rounded-full"
              style={{
                width: '14px',
                height: '14px',
                background: 'radial-gradient(circle, oklch(0.48 0.12 140) 0%, oklch(0.58 0.10 140) 100%)',
                boxShadow: '0 0 12px oklch(0.48 0.12 140 / 0.5)',
                animation: 'leafBreathe 2s ease-in-out infinite',
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

      {/* Bottom decorative glows */}
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

// Deterministic color per shape id so it doesn't flicker each frame
function randomColorForShape(id: number) {
  return COLORS[id % COLORS.length];
}
