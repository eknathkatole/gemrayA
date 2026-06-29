import useReveal from '../hooks/useReveal';
import './Quote.css';

export default function Quote() {
  const ref = useReveal();
  return (
    <div className="quote-band" ref={ref}>
      <div className="quote-deco">"</div>
      <div className="quote-inner reveal">
        <p>"Capture your lovely memories with us — in high quality and in your budget."</p>
        <span>— Bhushan Lawane, Gemray Studio</span>
      </div>
    </div>
  );
}
