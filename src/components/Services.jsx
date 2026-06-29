import useReveal from '../hooks/useReveal';
import './Services.css';

const services = [
  { icon: '💍', title: 'Wedding Photography', desc: 'Complete wedding day coverage — every emotion, beautifully frozen in time.' },
  { icon: '🎬', title: 'Wedding Cinematography', desc: 'Cinematic wedding films that feel like a Bollywood love story.' },
  { icon: '🌸', title: 'Pre-Wedding Shoot', desc: 'Romantic, fun, or adventurous — we design your story around your personality.' },
  { icon: '💎', title: 'Engagement Shoot', desc: 'Celebrate the beginning of forever with a stunning engagement session.' },
  { icon: '✈️', title: 'Destination Wedding', desc: 'We travel across Maharashtra and beyond — wherever love takes you.' },
  { icon: '🎞️', title: 'Behind The Scenes', desc: 'Candid BTS content perfect for Instagram reels and social media.' },
];

export default function Services() {
  const ref = useReveal();

  return (
    <section id="services" className="section section-gray" ref={ref}>
      <div className="container">
        <span className="label center reveal">What We Offer</span>
        <h2 className="section-title center reveal d1">Our Services</h2>

        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card reveal scale-in d${i + 1}`}
            >
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
