import { useState, useRef } from 'react';
import useReveal from '../hooks/useReveal';
import './Gallery.css';

const BASE = import.meta.env.BASE_URL;

const allPhotos = [
  { src: `${BASE}photos/photo1.jpg`,  cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo2.jpg`,  cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: `${BASE}photos/photo3.jpg`,  cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo4.jpg`,  cat: 'engagement', alt: 'Engagement' },
  { src: `${BASE}photos/photo5.jpg`,  cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: `${BASE}photos/photo6.jpg`,  cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo7.jpg`,  cat: 'engagement', alt: 'Engagement' },
  { src: `${BASE}photos/photo8.jpg`,  cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo9.jpg`,  cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: `${BASE}photos/photo10.jpg`, cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo11.jpg`, cat: 'engagement', alt: 'Engagement' },
  { src: `${BASE}photos/photo12.jpg`, cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: `${BASE}photos/photo13.jpg`, cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo14.jpg`, cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: `${BASE}photos/photo15.jpg`, cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo16.jpg`, cat: 'engagement', alt: 'Engagement' },
  { src: `${BASE}photos/photo17.jpg`, cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo18.jpg`, cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: `${BASE}photos/photo19.jpg`, cat: 'wedding',    alt: 'Wedding' },
  { src: `${BASE}photos/photo20.jpg`, cat: 'engagement', alt: 'Engagement' },
];

const tabs = [
  { key: 'all',        label: 'All' },
  { key: 'wedding',    label: 'Wedding' },
  { key: 'prewedding', label: 'Pre-Wedding' },
  { key: 'engagement', label: 'Engagement' },
];

export default function Gallery() {
  const [activeTab, setActiveTab]       = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState(allPhotos);
  const [animating, setAnimating]       = useState(false);
  const [limit, setLimit]               = useState(8);
  const ref = useReveal();

  const displayPhotos = filteredPhotos.slice(0, limit);
  const showSeeMore = filteredPhotos.length > 8;

  function switchTab(key) {
    if (key === activeTab || animating) return;
    setAnimating(true);
    setLimit(8); // Reset limit on tab switch
    setTimeout(() => {
      setActiveTab(key);
      setFilteredPhotos(key === 'all' ? allPhotos : allPhotos.filter(p => p.cat === key));
      setAnimating(false);
    }, 400);
  }

  function toggleLimit() {
    if (limit === 8) {
      setLimit(filteredPhotos.length);
    } else {
      setLimit(8);
    }
  }

  return (
    <section id="gallery" className="section" ref={ref}>
      <div className="container">
        <span className="label center reveal">Our Work</span>
        <h2 className="section-title center reveal d1">Photo Gallery</h2>

        <div className="gallery-tabs reveal d2">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`gtab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => switchTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={`gallery-grid ${animating ? 'fading' : ''}`}>
          {displayPhotos.map((photo, i) => (
            <div
              key={photo.src}
              className={`g-item reveal scale-in d${(i % 6) + 1}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="g-overlay">
                <div className="g-overlay-content">
                  <div className="g-zoom-icon">🖼️</div>
                  <span>{photo.alt}</span>
                </div>
              </div>
              <div className="g-shine" />
            </div>
          ))}
        </div>

        {showSeeMore && (
          <div className="album-open-wrap reveal d3">
            <button className="btn-primary album-open-btn" onClick={toggleLimit}>
              {limit === 8 ? 'See More' : 'See Less'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
