import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Команда', href: '#team' },
    { label: 'Історія', href: '#story' },
    { label: 'Контакти', href: '#contacts' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-gold hover:text-gold/80 transition">
            GOTHAM
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white hover:text-gold transition duration-300 font-medium"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://n800898.alteg.io/company/752876/personal/select-services?o="
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-dark px-6 py-2 rounded hover:bg-gold/90 transition font-semibold"
          >
            Записатись
          </a>
          <a
            href="tel:+38068895862"
            className="text-gold hover:text-gold/80 transition font-semibold"
          >
            +38 068 895 862
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gold hover:text-gold/80 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md border-t border-gold/20">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-white hover:text-gold transition py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://n800898.alteg.io/company/752876/personal/select-services?o="
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gold text-dark px-6 py-3 rounded text-center font-semibold hover:bg-gold/90 transition"
            >
              Записатись
            </a>
            <a
              href="tel:+38068895862"
              className="block text-gold text-center py-2 font-semibold hover:text-gold/80"
            >
              Зателефонувати
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
