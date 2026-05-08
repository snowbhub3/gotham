import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        scrollTrigger: {
          trigger: '.footer-content',
          start: 'top 90%',
        },
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: 'power3.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-dark/95 border-t border-gold/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gold mb-3">GOTHAM</h3>
            <p className="text-gray-400">
              Преміальна чоловіча стрижка у центрі Хмельницького. Професіоналізм, стиль та атмосфера.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Навігація</h4>
            <ul className="space-y-2">
              <li>
                <a href="#team" className="text-gray-400 hover:text-gold transition">
                  Команда
                </a>
              </li>
              <li>
                <a href="#story" className="text-gray-400 hover:text-gold transition">
                  Історія
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-gray-400 hover:text-gold transition">
                  Контакти
                </a>
              </li>
              <li>
                <a
                  href="https://n800898.alteg.io/company/752876/personal/select-services?o="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition"
                >
                  Записатись
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Зв'яжіться з нами</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+38068895862"
                  className="text-gray-400 hover:text-gold transition"
                >
                  +38 068 895 862
                </a>
              </li>
              <li className="text-gray-400">
                Хмельницький, вул. Кам'янецька
              </li>
              <li className="text-gray-400">
                Пн-Пт: 10:00 - 20:00
              </li>
              <li className="text-gray-400">
                Сб-Нд: 10:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2026 GOTHAM Barbershop у центрі Хмельницького. Всі права захищені.
          </p>
          <p className="text-gray-500 text-sm">
            Сучасний сайт барбершопу розроблений на React + Vite з ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
