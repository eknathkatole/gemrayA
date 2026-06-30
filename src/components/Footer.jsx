import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">

        <div className="footer-brand">
          <img src={`${import.meta.env.BASE_URL}photos/logo.png`} alt="Gemray Studio" />
          <div className="footer-brand-name">
            <span className="fb-main">Gemray</span>
            <span className="fb-sub">Studio</span>
          </div>
          <p className="footer-tagline">Glaze of Wedding Moments</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a href="https://www.instagram.com/gemraystudio/" target="_blank" rel="noreferrer">
            Instagram: @gemraystudio
          </a>
          <a href="https://wa.me/message/AZ6IJJFY67CKG1" target="_blank" rel="noreferrer">
            WhatsApp Us
          </a>
          <a href="tel:+918956010406">+91 89560 10406</a>
        </div>

      </div>

      <div className="footer-bottom container">
        <p>© 2025 Gemray Studio · Bhushan Lawane · Jalgaon, Maharashtra</p>
        <p>Made with ❤️ for love stories</p>
      </div>
    </footer>
  );
}
