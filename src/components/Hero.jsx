import { useEffect, useRef, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef(null);
  const videoRef  = useRef(null);
  const [videoError, setVideoError] = useState(false);

  /* ── Video: force-play on mobile ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    // Some browsers block autoplay; try to play after user gesture or directly
    const tryPlay = () => {
      vid.play().catch(() => setVideoError(true));
    };
    vid.addEventListener('canplay', tryPlay, { once: true });
    tryPlay();
    return () => vid.removeEventListener('canplay', tryPlay);
  }, []);

  /* ── Floating hearts canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let hearts   = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function newHeart(randomY = false) {
      return {
        x:           Math.random() * canvas.width,
        y:           randomY ? Math.random() * canvas.height : canvas.height + 20,
        size:        6 + Math.random() * 12,
        speed:       0.35 + Math.random() * 1.0,
        drift:       (Math.random() - 0.5) * 0.45,
        opacity:     0.1 + Math.random() * 0.25,
        wobble:      Math.random() * Math.PI * 2,
        wobbleSpeed: 0.016 + Math.random() * 0.022,
      };
    }
    for (let i = 0; i < 20; i++) hearts.push(newHeart(true));

    function drawHeart(x, y, s, op) {
      ctx.save();
      ctx.globalAlpha = op;
      ctx.fillStyle   = '#e83050';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - s*0.3, x - s*0.5, y - s*0.8, x - s*0.5, y - s*0.5);
      ctx.bezierCurveTo(x - s*0.5, y - s*1.1, x, y - s*1.0, x, y - s*0.7);
      ctx.bezierCurveTo(x, y - s*1.0, x + s*0.5, y - s*1.1, x + s*0.5, y - s*0.5);
      ctx.bezierCurveTo(x + s*0.5, y - s*0.8, x, y - s*0.3, x, y);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((h, i) => {
        h.wobble += h.wobbleSpeed;
        h.y      -= h.speed;
        h.x      += h.drift + Math.sin(h.wobble) * 0.3;
        drawHeart(h.x, h.y, h.size, h.opacity);
        if (h.y < -20) hearts[i] = newHeart();
      });
      if (Math.random() < 0.025 && hearts.length < 32) hearts.push(newHeart());
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* ── Background video — all required attrs for mobile autoplay ── */}
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onError={() => setVideoError(true)}
      >
        <source src="/vid/bg.mp4" type="video/mp4" />
      </video>

      {/* Fallback gradient when video fails */}
      {videoError && <div className="hero-video-fallback" />}

      <div className="hero-overlay" />

      <div className="hero-content">
        {/* Script font accent line */}
        <p className="hero-script">Glaze of Wedding Moments</p>

        {/* Cinzel font brand title */}
        <h1 className="hero-title">
          <span className="hero-title-main">Gemray</span>
          <span className="hero-title-accent">Studio</span>
        </h1>

        <p className="hero-tagline">✦ &nbsp; Wedding Cinematographer &amp; Photographer &nbsp; ✦</p>
        <p className="hero-sub">Maharashtra · Destination Weddings</p>

        <div className="hero-btns">
          <a href="#gallery" className="btn-outline">View Our Work</a>
          <a href="#contact" className="btn-primary">Book a Session</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span>200+</span>
            <p>Weddings</p>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span>10+</span>
            <p>Years Exp.</p>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span>500+</span>
            <p>Happy Clients</p>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll down">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <p>Scroll Down</p>
      </a>
    </section>
  );
}
