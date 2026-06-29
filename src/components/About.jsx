import useReveal from '../hooks/useReveal';
import './About.css';

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container about-grid">

        {/* Image side */}
        <div className="about-img-wrap reveal from-left">
          <img src="/photos/photo1.jpg" alt="Bhushan Lawane" />
          <div className="about-badge">
            <span>10+</span>
            <p>Years of Experience</p>
          </div>
          <div className="about-img-deco" />
        </div>

        {/* Text side */}
        <div className="about-text">
          <span className="label reveal d1">Who We Are</span>
          <h2 className="section-title reveal d2">
            Bhushan Lawane &amp;<br />Gemray Studio
          </h2>
          <p className="reveal d2">
            Based in <strong>Jalgaon, Maharashtra</strong>, Gemray Studio is a
            wedding cinematography and photography brand dedicated to telling your
            love story with authenticity and artistry.
          </p>
          <p className="reveal d3">
            We believe every couple deserves high-quality memories — beautifully
            captured and within your budget.
          </p>

          <ul className="about-list reveal d3">
            <li>Pre-Wedding &amp; Engagement Shoots</li>
            <li>Wedding Day Full Coverage</li>
            <li>Cinematic Wedding Films</li>
            <li>Destination &amp; Travel Shoots</li>
          </ul>

          <a href="#contact" className="btn-primary reveal d4">
            Get in Touch →
          </a>
        </div>

      </div>
    </section>
  );
}
