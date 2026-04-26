import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, animId;
    const particles = [];
    // Sophisticated teal/amber/neutral palette
    const colors = ["#14b8a6", "#0f766e", "#2dd4bf", "#f59e0b", "#fbbf24", "#d97706", "#6366f1", "#64748b"];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // More particles, bigger, faster
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }

    function createParticle() {
      const type = Math.random();
      return {
        x: Math.random() * (w || 2000),
        y: Math.random() * (h || 2000),
        size: Math.random() * 10 + 4, // bigger: 4-14px
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.8 + 0.3, // faster
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4, // faster spin
        opacity: Math.random() * 0.35 + 0.08,
        shape: type < 0.3 ? "circle" : type < 0.6 ? "rect" : type < 0.8 ? "triangle" : "diamond",
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.04 + 0.015,
        wobbleRadius: Math.random() * 1.5 + 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    }

    function drawTriangle(ctx, size) {
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.fill();
    }

    function drawDiamond(ctx, size) {
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 3, 0);
      ctx.lineTo(0, size / 2);
      ctx.lineTo(-size / 3, 0);
      ctx.closePath();
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y = (p.y + p.speedY) % h;
        p.wobble += p.wobbleSpeed;
        p.pulsePhase += p.pulseSpeed;
        p.x = (p.x + p.speedX + Math.sin(p.wobble) * p.wobbleRadius + w) % w;
        p.rotation += p.rotationSpeed;

        const pulse = 1 + Math.sin(p.pulsePhase) * 0.15;
        const currentSize = p.size * pulse;

        ctx.save();
        ctx.globalAlpha = p.opacity * (0.8 + Math.sin(p.pulsePhase) * 0.2);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        switch (p.shape) {
          case "rect":
            ctx.fillRect(-currentSize / 2, -currentSize / 4, currentSize, currentSize / 2);
            break;
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, currentSize / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "triangle":
            drawTriangle(ctx, currentSize);
            break;
          case "diamond":
            drawDiamond(ctx, currentSize);
            break;
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
