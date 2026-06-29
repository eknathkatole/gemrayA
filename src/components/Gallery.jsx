import { useState, useEffect, useRef } from 'react';
import AlbumViewer from './AlbumViewer';
import useReveal from '../hooks/useReveal';
import './Gallery.css';

const allPhotos = [
  { src: '/photos/photo1.jpg',  cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo2.jpg',  cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: '/photos/photo3.jpg',  cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo4.jpg',  cat: 'engagement', alt: 'Engagement' },
  { src: '/photos/photo5.jpg',  cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: '/photos/photo6.jpg',  cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo7.jpg',  cat: 'engagement', alt: 'Engagement' },
  { src: '/photos/photo8.jpg',  cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo9.jpg',  cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: '/photos/photo10.jpg', cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo11.jpg', cat: 'engagement', alt: 'Engagement' },
  { src: '/photos/photo12.jpg', cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: '/photos/photo13.jpg', cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo14.jpg', cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: '/photos/photo15.jpg', cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo16.jpg', cat: 'engagement', alt: 'Engagement' },
  { src: '/photos/photo17.jpg', cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo18.jpg', cat: 'prewedding', alt: 'Pre-Wedding' },
  { src: '/photos/photo19.jpg', cat: 'wedding',    alt: 'Wedding' },
  { src: '/photos/photo20.jpg', cat: 'engagement', alt: 'Engagement' },
];

const tabs = [
  { key: 'all',        label: 'All' },
  { key: 'wedding',    label: 'Wedding' },
  { key: 'prewedding', label: 'Pre-Wedding' },
  { key: 'engagement', label: 'Engagement' },
];

export default function Gallery() {
  const [activeTab, setActiveTab]     = useState('all');
  const [visible, setVisible]         = useState(allPhotos);
  const [animating, setAnimating]     = useState(false);
  const [albumOpen, setAlbumOpen]     = useState(false);
  const [albumIndex, setAlbumIndex]   = useState(0);
  const ref = useReveal();

  function switchTab(key) {
    if (key === activeTab || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(key);
      setVisible(key === 'all' ? allPhotos : allPhotos.filter(p => p.cat === key));
      setAnimating(false);
    }, 280);
  }

  function openAlbum(idx) {
    setAlbumIndex(idx);
    setAlbumOpen(true);
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
          {visible.map((photo, i) => (
            <div
              key={photo.src}
              className={`g-item reveal scale-in d${(i % 6) + 1}`}
              onClick={() => openAlbum(i)}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="g-overlay">
                <div className="g-overlay-content">
                  <div className="g-zoom-icon">🔍</div>
                  <span>{photo.alt}</span>
                </div>
              </div>
              <div className="g-shine" />
            </div>
          ))}
        </div>

        <div className="album-open-wrap reveal d3">
          <button className="btn-primary album-open-btn" onClick={() => openAlbum(0)}>
            📖 Open Full Photo Album
          </button>
        </div>
      </div>

      {albumOpen && (
        <AlbumViewer
          photos={visible}
          startIndex={albumIndex}
          onClose={() => setAlbumOpen(false)}
        />
      )}
    </section>
  );
}
