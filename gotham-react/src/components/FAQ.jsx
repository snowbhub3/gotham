import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-title', {
        scrollTrigger: {
          trigger: '.faq-title',
          start: 'top 75%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
      });

      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: '.faq-item',
          start: 'top 75%',
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: 'Як записатись на стрижку?',
      answer: 'Просто зателефонуйте за номером +38 068 895 862 або натисніть на кнопку "Записатись" на нашому сайті та виберіть зручний час.',
    },
    {
      question: 'Чи є у вас скидка для нових клієнтів?',
      answer: 'Звісно! У нас знайдеться спеціальна пропозиція для кожного. Запитайте про них під час запису або першого візиту.',
    },
    {
      question: 'Який стиль стрижки обрати?',
      answer: 'Наші майстри допоможуть Вам визначитися та підберуть найкращий стиль під вас. Можете показати фото бажаної стрижки або довіритися рекомендаціям спеціалістів.',
    },
    {
      question: 'Чи можу я прийти без запису?',
      answer: 'Звичайно! Приходьте та друзів беріть із собою. Адже у нас Ви забудете, що таке нудне очікування!',
    },
    {
      question: 'Чи працюєте ви у вихідні дні?',
      answer: 'Так, для Вас ми працюємо кожного дня з 10:00 до 20:00 (пн-пт), у суботу з 10:00 до 18:00, у неділю з 10:00 до 18:00.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-dark to-dark/95 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="faq-title text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Частіші запитання
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border border-gold/30 rounded-lg overflow-hidden bg-dark/50 hover:border-gold/60 transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gold/5 transition"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 text-gold transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gold/20 bg-dark/30">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
