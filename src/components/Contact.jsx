import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const ref = useReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', date:'', message:'' });

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setForm({ name:'', phone:'', email:'', service:'', date:'', message:'' });
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <section id="contact" className="section section-gray" ref={ref}>
      <div className="container contact-grid">

        <div className="contact-info reveal from-left">
          <span className="label">Let's Talk</span>
          <h2 className="section-title">Book Your Session</h2>
          <p>Limited bookings per month — reach out early to lock in your date.</p>

          <ul className="contact-details">
            <li>
              <div className="contact-icon">📍</div>
              <div>
                <strong>Location</strong>
                <span>Jalgaon, Maharashtra, India</span>
              </div>
            </li>
            <li>
              <div className="contact-icon">📞</div>
              <div>
                <strong>Phone / WhatsApp</strong>
                <a href="tel:+918956010406">+91 89560 10406</a>
              </div>
            </li>
            <li>
              <div className="contact-icon">📸</div>
              <div>
                <strong>Instagram</strong>
                <a href="https://www.instagram.com/gemraystudio/" target="_blank" rel="noreferrer">@gemraystudio</a>
              </div>
            </li>
            <li>
              <div className="contact-icon">💬</div>
              <div>
                <strong>WhatsApp Direct</strong>
                <a href="https://wa.me/message/AZ6IJJFY67CKG1" target="_blank" rel="noreferrer">Chat with us on WhatsApp</a>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact-form reveal from-right" onSubmit={handleSubmit}>
          {sent && <div className="form-success">✅ Thank you! Bhushan will get back to you shortly.</div>}

          <div className="form-row">
            <div className="form-group">
              <input name="name" type="text" placeholder=" " value={form.name} onChange={handleChange} required />
              <label>Your Name</label>
            </div>
            <div className="form-group">
              <input name="phone" type="tel" placeholder=" " value={form.phone} onChange={handleChange} required />
              <label>Phone Number</label>
            </div>
          </div>

          <div className="form-group">
            <input name="email" type="email" placeholder=" " value={form.email} onChange={handleChange} required />
            <label>Email Address</label>
          </div>

          <div className="form-group">
            <select name="service" value={form.service} onChange={handleChange} required>
              <option value="" disabled>Select Service</option>
              <option>Wedding Photography</option>
              <option>Wedding Cinematography</option>
              <option>Pre-Wedding Shoot</option>
              <option>Engagement Shoot</option>
              <option>Destination Wedding</option>
              <option>Full Package (Photo + Film)</option>
            </select>
          </div>

          <div className="form-group">
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <textarea name="message" rows="4" placeholder=" " value={form.message} onChange={handleChange} />
            <label>Tell us about your special day...</label>
          </div>

          <button type="submit" className="btn-primary full-w">
            Send Enquiry ✨
          </button>
        </form>

      </div>
    </section>
  );
}
