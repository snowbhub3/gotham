import { useEffect } from 'react';
import './index.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Team from './components/Team';
import Story from './components/Story';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import { addJsonLd, generateLocalBusinessSchema } from './utils/seo';
import { registerServiceWorker } from './utils/registerServiceWorker';

function App() {
  useEffect(() => {
    document.documentElement.lang = 'uk';
    document.title = 'GOTHAM Barbershop | Чоловіча стрижка у Хмельницькому';

    // Додавання schema.org для локального бізнесу
    const schema = generateLocalBusinessSchema();
    addJsonLd(schema);

    // Реєстрація Service Worker для PWA
    registerServiceWorker();

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      <Hero />
      <Gallery />
      <Story />
      <Team />
      <FAQ />
      <Contacts />
      <Footer />
    </div>
  );
}

export default App;
