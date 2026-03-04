import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Philosophy } from './components/Philosophy';
import { Protocol } from './components/Protocol';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Philosophy />
        <Protocol />
      </main>
      <Footer />
    </div>
  );
}
