import { useState, useEffect, useCallback } from 'react';
import './AlbumViewer.css';

export default function AlbumViewer({ photos, startIndex, onClose }) {
  const [current, setCurrent]       = useState(startIndex);
  const [flipping, setFlipping]     = useState(null); // 'forward' | 'backward' | null
  const [displayIdx, setDisplayIdx] = useState(startIndex);
  const [show, setShow]             = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const close = () => {
    setShow(false);
    setTimeout(onClose, 400);
  };

  const goTo = useCallback((nextIdx, dir) => {
    if (flipping || nextIdx < 0 || nextIdx >= photos.length) return;
    setFlipping(dir);
    setTimeout(() => {
      setCurrent(nextIdx);
      setDisplayIdx(nextIdx);
      setFlipping(null);
    }, 650);
  }, [flipping, photos.length]);

  const prev = () => goTo(current - 1, 'backward');
  const next = () => goTo(current + 1, 'forward');

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'Escape')     close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, flipping]);

  const leftPhoto  = photos[displayIdx - 1];
  const rightPhoto = photos[displayIdx];
  const flipPhoto  = flipping === 'forward' ? photos[current] : photos[current - 1];

  return (
    <div className={`album-backdrop ${show ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="album-container">

        <button className="album-close" onClick={close} aria-label="Close">✕</button>

        <div className="album-title">
          <span>📖 Gemray Studio</span>
          <em>Wedding Album</em>
        </div>

        <div className="album-book">
          {/* Left page */}
          <div className="album-page page-left">
            {leftPhoto
              ? <img src={leftPhoto.src} alt={leftPhoto.alt} />
              : <div className="page-blank"><span>Gemray Studio</span></div>
            }
            <div className="page-num">{displayIdx > 0 ? displayIdx : ''}</div>
          </div>

          {/* Spine */}
          <div className="album-spine" />

          {/* Right page */}
          <div className="album-page page-right">
            {rightPhoto
              ? <img src={rightPhoto.src} alt={rightPhoto.alt} />
              : <div className="page-blank"><span>The End</span></div>
            }
            <div className="page-num">{displayIdx + 1}</div>
          </div>

          {/* Flipping page */}
          {flipping && (
            <div className={`flip-page flip-${flipping}`}>
              {flipPhoto && <img src={flipPhoto.src} alt="" />}
            </div>
          )}
        </div>

        <div className="album-controls">
          <button className="album-btn" onClick={prev} disabled={current === 0}>
            ← Prev
          </button>
          <span className="album-counter">
            {current + 1} / {photos.length}
          </span>
          <button className="album-btn" onClick={next} disabled={current >= photos.length - 1}>
            Next →
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="album-thumbs">
          {photos.map((p, i) => (
            <div
              key={p.src}
              className={`album-thumb ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'forward' : 'backward')}
            >
              <img src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
