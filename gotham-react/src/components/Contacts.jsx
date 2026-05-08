import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Facebook, Instagram, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contacts() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contacts-title', {
        scrollTrigger: {
          trigger: '.contacts-title',
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
          x: index % 2 === 0 ? -40 : 40,
          ease: 'power3.out',
          delay: index * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Адреса',
      value: 'вул. Кам\'янецька, Хмельницький',
      link: 'https://maps.google.com/?q=49.428818,26.981754',
    },
    {
      icon: Phone,
      label: 'Телефон',
      value: '+38 068 895 862',
      link: 'tel:+38068895862',
    },
    {
      icon: Clock,
      label: 'Час роботи',
      value: 'Пн-Пт: 10:00 - 20:00\nСб: 10:00 - 18:00\nНд: 10:00 - 18:00',
      link: null,
    },
  ];

  const socials = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/gotham_khm',
      icon: Facebook,
      color: '#1877F2',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gotham_khm/',
      icon: Instagram,
      color: '#f00075',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@gotham_khm',
      icon: Share2,
      color: '#000000',
    },
  ];

  return (
    <section id="contacts" ref={sectionRef} className="py-24 bg-dark px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="contacts-title text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Контакти
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.link || '#'}
                  target={info.link?.startsWith('http') ? '_blank' : undefined}
                  rel={info.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="flex gap-6 p-6 bg-dark/50 border border-gold/20 rounded-lg hover:border-gold/60 hover:bg-dark/70 transition group"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-gold group-hover:text-gold/80 transition" />
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold mb-1">{info.label}</h3>
                    <p className="text-white whitespace-pre-line text-lg group-hover:text-gold/80 transition">
                      {info.value}
                    </p>
                  </div>
                </a>
              );
            })}

            {/* Social Links */}
            <div className="pt-6">
              <h3 className="text-gold font-semibold mb-4">Слідкуйте за нами</h3>
              <div className="flex gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition hover:scale-110 hover:shadow-lg"
                      style={{ backgroundColor: social.color }}
                      title={social.name}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-gold/20 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.946910571441!2d26.981754099999996!3d49.428817699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473207e58d9c1a31%3A0xc77e52681197280a!2z0JHQsNGA0LHQtdGA0YjQvtC_IEdvdGhhbQ!5e0!3m2!1suk!2sua!4v1736185449907!5m2!1suk!2sua"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GOTHAM Barbershop на карті"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <a
            href="https://n800898.alteg.io/company/752876/personal/select-services?o="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gold text-dark font-bold text-lg rounded hover:bg-gold/90 shadow-lg hover:shadow-gold/50 transition"
          >
            Записатися на стрижку прямо зараз
          </a>
        </div>
      </div>
    </section>
  );
}
