import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-title', {
        scrollTrigger: {
          trigger: '.team-title',
          start: 'top 75%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
      });

      itemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
          },
          duration: 0.8,
          opacity: 0,
          y: 40,
          ease: 'power3.out',
          delay: index * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const team = [
    {
      name: 'Олександр',
      role: 'Барбер',
      image: 'https://assets.alteg.io/masters/origin/f/fa/fa3f8ac8a039ed4_20240216210226.jpeg',
      bookingUrl: 'https://n800898.alteg.io/company/752876/personal/select-master/master-info/752876/2155939?o=',
    },
    {
      name: 'Богдан',
      role: 'Барбер',
      image: 'https://assets.alteg.io/masters/origin/a/aa/aafe8b8f0227b36_20241219190207.jpeg',
      bookingUrl: 'https://n800898.alteg.io/company/752876/personal/select-master/master-info/752876/2775748?o=',
    },
    {
      name: 'Валентин',
      role: 'Молодший барбер',
      image: 'https://assets.alteg.io/masters/origin/8/8b/8b7b81f293a3ab3_20250928134142.jpeg',
      bookingUrl: 'https://n800898.alteg.io/company/752876/personal/select-master/master-info/752876/2881238?o=m2849555',
    },
  ];

  return (
    <section id="team" ref={sectionRef} className="py-24 bg-dark/95 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="team-title text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Наша Команда
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <a
              key={index}
              href={member.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (itemsRef.current[index] = el)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-gold transition">
                {member.name}
              </h3>
              <p className="text-gold text-lg mt-2">{member.role}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
