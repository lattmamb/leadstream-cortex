
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ParticleFieldProps {
  className?: string;
  particleColor?: string;
  backgroundColor?: string;
  particleCount?: number;
  speedFactor?: number;
  particleSize?: number;
  interactionRadius?: number;
  particleForce?: number;
  particleDecay?: number;
  particleTension?: number;
  darkMode?: boolean;
  particleDensity?: number;
  mode?: "creative" | "balanced" | "precise";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  decay: number;
  opacity: number;
}

export function ParticleField({
  className,
  particleColor = "#ffffff",
  backgroundColor = "transparent",
  particleCount = 100,
  speedFactor = 1,
  particleSize = 2,
  interactionRadius = 150,
  particleForce = 0.15,
  particleDecay = 0.96,
  particleTension = 0.1,
  darkMode = true,
  particleDensity = 5000,
  mode = "balanced"
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, px: -1000, py: -1000 });
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const animFrameRef = useRef<number | null>(null);
  
  // Mode-specific settings
  const modeSettings = {
    creative: {
      particleColor: "#FF719A",
      particleCount: Math.floor(particleCount * 1.5),
      speedFactor: speedFactor * 1.25,
      particleSize: particleSize * 1.2,
      interactionRadius: interactionRadius * 1.5,
      particleForce: particleForce * 1.5,
      particleDecay: 0.90,
      lifespan: 300,
    },
    balanced: {
      particleColor: "#4D8BFF",
      particleCount: particleCount,
      speedFactor: speedFactor,
      particleSize: particleSize,
      interactionRadius: interactionRadius,
      particleForce: particleForce,
      particleDecay: particleDecay,
      lifespan: 200,
    },
    precise: {
      particleColor: "#32CD32",
      particleCount: Math.floor(particleCount * 0.8),
      speedFactor: speedFactor * 0.75,
      particleSize: particleSize * 0.8,
      interactionRadius: interactionRadius * 0.8,
      particleForce: particleForce * 0.7,
      particleDecay: 0.98,
      lifespan: 150,
    }
  };
  
  const activeSettings = modeSettings[mode];

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!container) return;
    
    ctxRef.current = canvas.getContext('2d');
    const ctx = ctxRef.current;
    if (!ctx) return;
    
    // Setup canvas
    function setSize() {
      boundingRef.current = container.getBoundingClientRect();
      canvas.width = boundingRef.current.width;
      canvas.height = boundingRef.current.height;
    }
    
    // Create particles
    function createParticles() {
      const { width, height } = boundingRef.current;
      const actualCount = Math.min(activeSettings.particleCount, Math.floor((width * height) / particleDensity));
      
      particlesRef.current = [];
      
      for (let i = 0; i < actualCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5 * activeSettings.speedFactor,
          vy: (Math.random() - 0.5) * 0.5 * activeSettings.speedFactor,
          originX: x,
          originY: y,
          size: Math.random() * activeSettings.particleSize + 1,
          color: activeSettings.particleColor,
          decay: activeSettings.particleDecay,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    }
    
    // Draw particles
    function drawParticles() {
      const { width, height } = boundingRef.current;
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach(particle => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    // Calculate mouse velocity
    function updateMouseVelocity() {
      const mouse = mouseRef.current;
      mouse.vx = mouse.x - mouse.px;
      mouse.vy = mouse.y - mouse.py;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
    }
    
    // Update particles
    function updateParticles() {
      const { width, height } = boundingRef.current;
      const mouse = mouseRef.current;
      
      particlesRef.current.forEach(particle => {
        // Particle move to origin with tension
        particle.vx += (particle.originX - particle.x) * particleTension;
        particle.vy += (particle.originY - particle.y) * particleTension;
        
        // Mouse interaction
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < activeSettings.interactionRadius) {
          const force = (activeSettings.interactionRadius - dist) / activeSettings.interactionRadius;
          const angle = Math.atan2(dy, dx);
          
          // Add mouse velocity influence
          const mouseForce = Math.min(10, Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy));
          
          particle.vx += Math.cos(angle) * force * activeSettings.particleForce * (1 + mouseForce * 0.05);
          particle.vy += Math.sin(angle) * force * activeSettings.particleForce * (1 + mouseForce * 0.05);
        }
        
        // Apply velocity
        particle.vx *= particle.decay;
        particle.vy *= particle.decay;
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary check with bounce
        if (particle.x < 0) {
          particle.x = 0;
          particle.vx = Math.abs(particle.vx) * 0.5;
        } else if (particle.x > width) {
          particle.x = width;
          particle.vx = -Math.abs(particle.vx) * 0.5;
        }
        
        if (particle.y < 0) {
          particle.y = 0;
          particle.vy = Math.abs(particle.vy) * 0.5;
        } else if (particle.y > height) {
          particle.y = height;
          particle.vy = -Math.abs(particle.vy) * 0.5;
        }
        
        // Random movement
        if (Math.random() < 0.01 * activeSettings.speedFactor) {
          particle.vx += (Math.random() - 0.5) * 0.3 * activeSettings.speedFactor;
          particle.vy += (Math.random() - 0.5) * 0.3 * activeSettings.speedFactor;
        }
      });
    }
    
    // Animation loop
    function animate() {
      updateMouseVelocity();
      updateParticles();
      drawParticles();
      animFrameRef.current = requestAnimationFrame(animate);
    }
    
    // Mouse move handlers
    function onMouseMove(e: MouseEvent) {
      const b = boundingRef.current;
      mouseRef.current.x = e.clientX - b.left;
      mouseRef.current.y = e.clientY - b.top + window.scrollY;
    }
    
    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      const touch = e.touches[0];
      const b = boundingRef.current;
      mouseRef.current.x = touch.clientX - b.left;
      mouseRef.current.y = touch.clientY - b.top + window.scrollY;
    }
    
    function onMouseLeave() {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    }
    
    // Init
    setSize();
    createParticles();
    animate();
    
    // Event listeners
    window.addEventListener('resize', setSize);
    window.addEventListener('resize', createParticles);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('mouseleave', onMouseLeave);
    
    // Cleanup
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener('resize', setSize);
      window.removeEventListener('resize', createParticles);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [
    mode,
    particleSize,
    particleCount,
    speedFactor,
    interactionRadius,
    particleForce,
    particleDecay,
    particleTension,
    particleColor,
    particleDensity
  ]);
  
  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
