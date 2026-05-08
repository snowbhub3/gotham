import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        duration: 1,
        opacity: 0,
        y: 50,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.hero-button', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 1.1,
        ease: 'power3.out',
        stagger: 0.2,
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen pt-20 overflow-hidden bg-gradient-to-b from-dark via-dark/80 to-dark flex items-center justify-center bg-[url('https://r.mobirisesite.com/748350/assets/images/mainfoto-p-1080.jpeg')] bg-cover bg-center">
      {/* YouTube Video Background - optional fallback */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <iframe
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-screen min-w-full min-h-[56.25vw]"
          src="https://www.youtube.com/embed/Obb9xzEaG08?autoplay=1&mute=1&playsinline=1&controls=0&loop=1&playlist=Obb9xzEaG08&modestbranding=1&rel=0&iv_load_policy=3&fs=0"
          title="GOTHAM Barbershop - Hero Video"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          frameBorder="0"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-dark/90" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          GOTHAM Barbershop
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-gold mb-8 drop-shadow-md">
          Преміальна чоловіча стрижка у центрі Хмельницького
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://n800898.alteg.io/company/752876/personal/select-services?o="
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button px-8 py-4 bg-gold text-dark font-bold text-lg rounded hover:bg-gold/90 shadow-lg hover:shadow-gold/50 transition"
          >
            Записатись онлайн
          </a>
          <a
            href="tel:+38068895862"
            className="hero-button px-8 py-4 border-2 border-gold text-gold font-bold text-lg rounded hover:bg-gold/10 transition"
          >
            Зателефонувати: +38 068 895 862
          </a>
        </div>
      </div>
    </section>
  );
}
