import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Quote from './components/Quote';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Quote />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
