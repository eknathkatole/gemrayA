import { useState, useEffect } from 'react';
import './Navbar.css';

const links = ['Home', 'About', 'Services', 'Gallery', 'Contact'];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href="#home" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <img src="/photos/logo.png" alt="Gemray Studio" />
        <div className="nav-logo-text">
          <span className="logo-main">Gemray</span>
          <span className="logo-sub">Studio</span>
        </div>
      </a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          </li>
        ))}
        <li className="nav-cta-mobile">
          <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Book Now
          </a>
        </li>
      </ul>

      <a href="#contact" className="nav-cta-desktop btn-primary">Book Now</a>

      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
