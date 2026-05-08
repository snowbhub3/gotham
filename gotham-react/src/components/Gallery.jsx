import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const galleryRef = useRef(null);
  const itemsRef = useRef([]);

  const images = [
    { src: 'https://r.mobirisesite.com/748350/assets/images/photo-gallery1-p-500.jpeg', alt: 'Чоловіча стрижка у барбершопі GOTHAM' },
    { src: 'https://r.mobirisesite.com/748350/assets/images/photo-gallery2-p-500.jpeg', alt: 'Професійні послуги барберинга' },
    { src: 'https://r.mobirisesite.com/748350/assets/images/photo-gallery3-p-500.jpeg', alt: 'Якісна стрижка у центрі' },
    { src: 'https://r.mobirisesite.com/748350/assets/images/photo-gallery4-p-500.jpeg', alt: 'Сучасний стиль та якість' },
    { src: 'https://r.mobirisesite.com/748350/assets/images/photo-gallery5-p-500.jpeg', alt: 'GOTHAM Barbershop фото' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          y: 50,
          ease: 'power2.out',
        });
      });

      gsap.from('.gallery-title', {
        scrollTrigger: {
          trigger: '.gallery-title',
          start: 'top 80%',
        },
        duration: 0.8,
        opacity: 0,
        y: 40,
        ease: 'power3.out',
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={galleryRef}
      className="py-24 bg-dark px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="gallery-title text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Наші роботи
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
