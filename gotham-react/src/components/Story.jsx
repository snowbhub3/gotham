import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story-title', {
        scrollTrigger: {
          trigger: '.story-title',
          start: 'top 75%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
      });

      gsap.from('.story-text', {
        scrollTrigger: {
          trigger: '.story-text',
          start: 'top 75%',
        },
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        stagger: 0.2,
      });

      gsap.from('.stats-item', {
        scrollTrigger: {
          trigger: '.stats-item',
          start: 'top 75%',
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '700+', label: 'Щасливих клієнтів' },
    { number: '5', label: 'Професійних барберів' },
    { number: '4', label: 'Роки на ринку' },
  ];

  return (
    <section id="story" ref={sectionRef} className="py-24 bg-gradient-to-b from-dark to-dark/95 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="story-title text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Історія GOTHAM
        </h2>

        <div ref={contentRef} className="space-y-8">
          <p className="story-text text-lg md:text-xl text-gray-300 leading-relaxed text-center">
            В GOTHAM ми віримо, що кожна стрижка — це не просто робота, а справжнє мистецтво. 
            Наша команда професіоналів з радістю перетворить ваше волосся на витвір мистецтва, 
            яке буде приковувати погляди та викликати заздрість навіть у друзів.
          </p>

          <p className="story-text text-lg md:text-xl text-gray-300 leading-relaxed text-center">
            Ми почали свій шлях в світі барберингу з однієї простої ідеї: зробити чоловіків 
            стильними та впевненими в собі. І робити це там, де інші і не думали. Звідси пішла 
            наша концепція з назвою GOTHAM в чорно-білих тонах та з легкою похмурістю. 
            З того часу ми пройшли довгий шлях, і тепер GOTHAM — це не просто барбершоп, 
            це ціла культура, де кожний гість — це VIP-клієнт.
          </p>

          <p className="story-text text-lg md:text-xl text-gray-300 leading-relaxed text-center">
            Наша місія — не просто стригти волосся, а створювати атмосферу, де кожний може 
            розслабитись, насолодитися процесом та піти зі стильною стрижкою та посмішкою на обличчі.
          </p>

          <p className="story-text text-center text-xl md:text-2xl font-semibold text-gold mt-12">
            Приєднуйтесь до нас і станьте частиною нашої історії
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div key={index} className="stats-item text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
