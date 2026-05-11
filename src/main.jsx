import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Moon,
  Music2,
  Phone,
  Scissors,
  Sparkles,
  Star,
  Sun,
  X,
} from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const bookingUrl = 'https://n800898.alteg.io/company/752876/personal/select-services?o=';
const googleReviewUrl = 'https://www.google.com/search?q=GOTHAM+Barbershop+%D0%A1%D0%BE%D0%B1%D0%BE%D1%80%D0%BD%D0%B0+14%2F2+%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B8%D0%B9#lrd=0x473207e58d9c1a31:0xc77e52681197280a,3,,,,';
const mapsRouteUrl = 'https://www.google.com/maps/dir/?api=1&destination=GOTHAM%20Barbershop%2C%20%D0%B2%D1%83%D0%BB.%20%D0%A1%D0%BE%D0%B1%D0%BE%D1%80%D0%BD%D0%B0%2014%2F2%2C%20%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B8%D0%B9&travelmode=driving';
const phone = '+38068895862';
const displayPhone = '+380 6889-58-62';
const marketStartYear = 2022;
const GA_IDS = (import.meta.env.VITE_GA_IDS || import.meta.env.VITE_GA_ID || 'G-5TJFV12V06,GT-57S8T9C3')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

const defaultLang = () => {
  if (typeof navigator === 'undefined') return 'uk';
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'uk';
};

function getMarketYears() {
  return Math.max(1, new Date().getFullYear() - marketStartYear);
}

function getMarketYearsLabel(lang, years) {
  if (lang === 'en') return 'years on the market';
  const mod10 = years % 10;
  const mod100 = years % 100;
  const word = mod10 === 1 && mod100 !== 11 ? 'рік' : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'роки' : 'років';
  return `${word} на ринку`;
}

const isUkraineLikeRegion = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Kyiv' || navigator.language?.toLowerCase().startsWith('uk');
  } catch {
    return false;
  }
};

function loadAnalytics() {
  if (!GA_IDS.length || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  GA_IDS.forEach((id) => window.gtag('config', id, { anonymize_ip: true }));
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_IDS[0]}`;
  document.head.appendChild(script);
}

function trackEvent(name, params = {}) {
  if (!window.gtag) return;
  window.gtag('event', name, {
    site_name: 'GOTHAM Barbershop',
    ...params,
  });
}

const gallery = [
  '/assets/photo-gallery1.jpg',
  '/assets/photo-gallery5.jpg',
  '/assets/photo-gallery3.jpg',
  '/assets/photo-gallery4.jpg',
  '/assets/photo-gallery2.jpg',
];

const masters = [
  {
    name: 'Олександр',
    nameEn: 'Oleksandr',
    role: 'Барбер',
    image: '/masters/oleksandr.jpeg',
    url: 'https://n800898.alteg.io/company/752876/personal/select-master/master-info/752876/2155939?o=',
    alt: 'Чоловіча стрижка в майстра Олександра у GOTHAM Barbershop, Хмельницький',
  },
  {
    name: 'Богдан',
    nameEn: 'Bohdan',
    role: 'Барбер',
    image: '/masters/bohdan.jpeg',
    url: 'https://n800898.alteg.io/company/752876/personal/select-master/master-info/752876/2775748?o=',
    alt: 'Чоловіча стрижка в майстра Богдана у GOTHAM Barbershop, Хмельницький',
  },
  {
    name: 'Валентин',
    nameEn: 'Valentyn',
    role: 'Барбер',
    image: '/masters/valentyn.jpeg',
    url: 'https://n800898.alteg.io/company/752876/personal/select-master/master-info/752876/2881238?o=m2849555',
    alt: 'Чоловіча стрижка в майстра Валентина у GOTHAM Barbershop, Хмельницький',
  },
];

const faqs = [
  ['Як записатись на стрижку?', 'Натисніть “Онлайн запис”, оберіть послугу, майстра та зручний час в Altegio. Також можна зателефонувати нам напряму.'],
  ['Чи є у вас пропозиція для нових клієнтів?', 'Так, у GOTHAM часто є спеціальні пропозиції для нових гостей. Актуальні умови краще уточнити під час запису.'],
  ['Який стиль стрижки обрати?', 'Наші майстри підберуть форму під тип волосся, риси обличчя, ваш темп життя і бажаний образ.'],
  ['Чи можу я прийти без запису?', 'Можна, але онлайн-запис гарантує, що майстер чекатиме саме на вас у вибраний час.'],
  ['Чи працюєте ви у вихідні?', 'Так, ми працюємо щодня з 09:00 до 21:00, щоб вам було зручно знайти час для стрижки.'],
];

const copy = {
  uk: {
    seoTitle: 'GOTHAM Barbershop | Твій барбершоп у Хмельницькому',
    seoDescription: 'Знаходимося в центрі Хмельницького, у нас: стильні чоловічі стрижки, моделювання бороди, хімічна завивка — усе швидко та якісно. Запис онлайн або за телефоном — зручно та легко. Вул. Соборна 14/2, тел. +38068895862.',
    nav: { team: 'Команда', story: 'Історія', booking: 'Запис', contacts: 'Контакти' },
    common: {
      call: 'Подзвонити',
      onlineBooking: 'Онлайн запис',
      route: 'Маршрут',
      close: 'Закрити',
      themeLight: 'Увімкнути світлу тему',
      themeDark: 'Увімкнути темну тему',
      langLabel: 'Перемикач мови. Українська або English',
      menu: 'Меню',
    },
    hero: {
      eyebrow: 'Барбершоп у центрі Хмельницького',
      body: 'Чорно-біла атмосфера, легка похмурість і точна чоловіча естетика. Стрижки, борода й стиль, з яким виходять упевненіше.',
      story: 'Історія GOTHAM',
      videoLabel: 'Атмосферне відео GOTHAM Barbershop у Хмельницькому',
    },
    gallery: {
      eyebrow: 'Атмосфера',
      title: 'Gotham vibe у кожному кадрі',
      body: 'Темна естетика, контраст, рух і відчуття місця, куди приходять не просто підстригтися, а зібрати образ.',
      ctaTitle: 'Покращіть свій стиль сьогодні!',
      service: 'Обрати послугу',
      altTop: 'Чоловіча стрижка у барбершопі GOTHAM, Хмельницький',
      altBottom: 'Атмосфера барбершопу GOTHAM у центрі Хмельницького',
    },
    booking: {
      eyebrow: 'Запис GOTHAM',
      title: 'Оберіть майстра і зручний час',
      body: 'Запис відкривається прямо на сайті: оберіть послугу, майстра та зручний час без зайвих переходів.',
      cardTitle: 'Запис на стрижку',
      cardBody: 'Якщо зручніше домовитися голосом, просто подзвоніть. Якщо хочете вибрати час самостійно, відкрийте онлайн-запис.',
      open: 'Відкрити онлайн запис',
      pills: [['Стрижка', 'чоловічий образ'], ['Борода', 'форма й догляд'], ['09:00-21:00', 'щодня']],
      modalTitle: 'Онлайн запис GOTHAM',
      servicesTitle: 'Послуги GOTHAM',
      loadingTitle: 'Завантажуємо онлайн запис',
      loadingBody: 'Підтягуємо вільний час, послуги та майстрів GOTHAM.',
    },
    marquee: 'GOTHAM Barbershop у центрі Хмельницького * Барбершоп поруч * Стрижка поруч * Можна постригтись тут * Записатись сьогодні * Стрижка сьогодні * Де постригтись у Хмельницькому * Чоловіча стрижка Хмельницький * Стрижка бороди Хмельницький * Барбер поруч Хмельницький * Premium barbershop Khmelnytskyi *',
    team: { eyebrow: 'Барбери', title: 'Команда GOTHAM', action: 'Записатися до майстра', bookingTitle: 'Запис до майстра' },
    story: {
      eyebrow: 'Історія GOTHAM',
      title: 'Не просто стрижка, а частина культури',
      metrics: [['700+', 'щасливих клієнтів'], ['5', 'професійних барберів'], ['4', 'роки на ринку']],
      p1: 'В GOTHAM ми віримо, що кожна стрижка - це не просто робота, а справжнє мистецтво. Наша команда професіоналів з радістю перетворить ваше волосся на витвір мистецтва, яке буде приковувати погляди та викликати заздрість навіть у друзів.',
      p2: 'Ми почали свій шлях в світі барберингу з однієї простої ідеї: зробити чоловіків стильними та впевненими в собі. Звідси і пішла наша концепція з назвою GOTHAM в чорно-білих тонах та з легкою похмурістю.',
      p3: 'Тепер GOTHAM - це не просто барбершоп, це культура, де кожний гість - VIP-клієнт. Ми в центрі Хмельницького, на вул. Соборна 14/2, тому до нас зручно зайти перед роботою, зустріччю чи вечірнім виходом.',
      join: 'Приєднуйтесь до нас і станьте частиною нашої історії',
      social: 'GOTHAM ближче, ніж здається',
    },
    faq: { eyebrow: 'FAQ', title: 'Питання та відповіді', items: faqs },
    review: {
      eyebrow: 'Відгуки',
      title: 'Ваші 5 зірок підсилюють GOTHAM',
      body: 'Поділіться враженням після стрижки або догляду за бородою. Ваш відгук у Google допомагає новим гостям швидше знайти GOTHAM у центрі Хмельницького.',
      note: 'Відкриється офіційна форма Google для компанії GOTHAM Barbershop.',
      action: 'Залишити відгук у Google',
    },
    contacts: {
      eyebrow: 'Контакти',
      title: 'GOTHAM у центрі Хмельницького',
      address: 'вул. Соборна 14/2, Хмельницький',
      booking: 'Онлайн запис у Altegio',
      mapTitle: 'GOTHAM Barbershop на мапі Хмельницького',
    },
    footer: '© 2026 GOTHAM Barbershop у центрі Хмельницького. Всі права захищені.',
    consent: {
      title: 'Cookie та аналітика',
      body: 'Ми використовуємо базові cookie для роботи сайту та, за вашою згодою, Google Analytics для розуміння кліків по запису, дзвінках, маршруті й відгуках.',
      accept: 'Погодитись',
      reject: 'Відхилити',
    },
  },
  en: {
    seoTitle: 'GOTHAM Barbershop | Your Barbershop in Khmelnytskyi',
    seoDescription: 'Located in the center of Khmelnytskyi, we offer stylish men’s haircuts, beard trimming and men’s perm — all done quickly and professionally. Book online or by phone — easy and convenient. Soborna 14/2, tel. +38068895862.',
    nav: { team: 'Team', story: 'Story', booking: 'Book', contacts: 'Contacts' },
    common: {
      call: 'Call',
      onlineBooking: 'Online booking',
      route: 'Route',
      close: 'Close',
      themeLight: 'Turn on light theme',
      themeDark: 'Turn on dark theme',
      langLabel: 'Language switcher. Ukrainian or English',
      menu: 'Menu',
    },
    hero: {
      eyebrow: 'Barbershop in central Khmelnytskyi',
      body: 'Black-and-white atmosphere, a slightly moody feel, and precise masculine aesthetics. Haircuts, beard work, and style that make you walk out more confident.',
      story: 'GOTHAM story',
      videoLabel: 'Atmospheric video of GOTHAM Barbershop in Khmelnytskyi',
    },
    gallery: {
      eyebrow: 'Atmosphere',
      title: 'Gotham vibe in every frame',
      body: 'Dark aesthetics, contrast, motion, and the feeling of a place where you come not just for a haircut, but to build your look.',
      ctaTitle: 'Upgrade your style today!',
      service: 'Choose a service',
      altTop: 'Men’s haircut at GOTHAM Barbershop, Khmelnytskyi',
      altBottom: 'Atmosphere of GOTHAM Barbershop in central Khmelnytskyi',
    },
    booking: {
      eyebrow: 'GOTHAM booking',
      title: 'Choose a barber and a convenient time',
      body: 'Booking opens directly on the website: choose a service, barber, and convenient time without extra redirects.',
      cardTitle: 'Book a haircut',
      cardBody: 'If it is easier to arrange by voice, just call us. If you want to pick a time yourself, open online booking.',
      open: 'Open online booking',
      pills: [['Haircut', 'men’s look'], ['Beard', 'shape and care'], ['09:00-21:00', 'daily']],
      modalTitle: 'GOTHAM online booking',
      servicesTitle: 'GOTHAM services',
      loadingTitle: 'Loading online booking',
      loadingBody: 'Loading available times, services, and GOTHAM barbers.',
    },
    marquee: 'GOTHAM Barbershop in central Khmelnytskyi * Barber near me * Men’s haircut near me * Get a haircut here * Book today * Haircut today * Where to get a haircut in Khmelnytskyi * Beard trim Khmelnytskyi * Premium barbershop Khmelnytskyi *',
    team: { eyebrow: 'Barbers', title: 'GOTHAM team', action: 'Book this barber', bookingTitle: 'Booking with barber' },
    story: {
      eyebrow: 'GOTHAM story',
      title: 'Not just a haircut, but part of the culture',
      metrics: [['700+', 'happy clients'], ['5', 'professional barbers'], ['4', 'years on the market']],
      p1: 'At GOTHAM, we believe every haircut is not just work, but real craftsmanship. Our professional team will gladly turn your hair into a piece of craft that catches attention and even makes friends a little jealous.',
      p2: 'We started our barbershop journey with one simple idea: to make men stylish and confident. That is where the GOTHAM concept came from, with black-and-white tones and a slightly moody character.',
      p3: 'Today GOTHAM is not just a barbershop, it is a culture where every guest is a VIP client. We are in central Khmelnytskyi at Soborna 14/2, so it is easy to stop by before work, a meeting, or an evening out.',
      join: 'Join us and become part of our story',
      social: 'GOTHAM is closer than it seems',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions and answers',
      items: [
        ['How do I book a haircut?', 'Click “Online booking”, choose a service, barber, and convenient time in Altegio. You can also call us directly.'],
        ['Do you have an offer for new clients?', 'Yes, GOTHAM often has special offers for new guests. Please check the current terms when booking.'],
        ['Which haircut style should I choose?', 'Our barbers will choose the shape for your hair type, facial features, lifestyle, and desired look.'],
        ['Can I come without booking?', 'You can, but online booking guarantees that the barber will be waiting for you at the selected time.'],
        ['Are you open on weekends?', 'Yes, we work daily from 09:00 to 21:00 so you can easily find time for a haircut.'],
      ],
    },
    review: {
      eyebrow: 'Reviews',
      title: 'Your 5 stars strengthen GOTHAM',
      body: 'Share your impression after a haircut or beard care. Your Google review helps new guests find GOTHAM faster in central Khmelnytskyi.',
      note: 'The official Google review form for GOTHAM Barbershop will open.',
      action: 'Leave a Google review',
    },
    contacts: {
      eyebrow: 'Contacts',
      title: 'GOTHAM in central Khmelnytskyi',
      address: 'Soborna St. 14/2, Khmelnytskyi',
      booking: 'Online booking in Altegio',
      mapTitle: 'GOTHAM Barbershop on the map of Khmelnytskyi',
    },
    footer: '© 2026 GOTHAM Barbershop in central Khmelnytskyi. All rights reserved.',
    consent: {
      title: 'Cookies and analytics',
      body: 'We use essential cookies for site functionality and, with your consent, Google Analytics to understand clicks on booking, calls, routes, and reviews.',
      accept: 'Accept',
      reject: 'Reject',
    },
  },
};

function useGsap() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.nav-shell', { y: -28, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.hero-reveal', {
        y: 34,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
      });
      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.from(item, {
          y: 46,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 82%' },
        });
      });
      gsap.utils.toArray('.stagger-scope').forEach((scope) => {
        gsap.from(scope.querySelectorAll('.stagger-item'), {
          y: 42,
          rotateX: 4,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'back.out(1.25)',
          scrollTrigger: { trigger: scope, start: 'top 78%' },
        });
      });
      gsap.utils.toArray('.metric-number').forEach((number) => {
        const target = Number(number.dataset.count || 0);
        const suffix = number.dataset.suffix || '';
        const counter = { value: 0 };

        gsap.fromTo(
          number,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: { trigger: number.closest('.metric'), start: 'top 86%', once: true },
          },
        );
        gsap.to(counter, {
          value: target,
          duration: 1.35,
          ease: 'power3.out',
          scrollTrigger: { trigger: number.closest('.metric'), start: 'top 86%', once: true },
          onUpdate() {
            number.textContent = `${Math.round(counter.value)}${suffix}`;
          },
          onComplete() {
            number.textContent = `${target}${suffix}`;
          },
        });
      });
      gsap.to('.hero-video-media', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.gallery-row-one', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: '.scroll-gallery', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.fromTo(
        '.gallery-row-two',
        { xPercent: -18 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.scroll-gallery', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        },
      );
      gsap.utils.toArray('.story-copy p').forEach((paragraph) => {
        paragraph.addEventListener('mouseenter', () => gsap.to(paragraph, { scale: 1.015, x: 6, duration: 0.28, ease: 'power2.out' }));
        paragraph.addEventListener('mouseleave', () => gsap.to(paragraph, { scale: 1, x: 0, duration: 0.28, ease: 'power2.out' }));
      });
    });

    return () => ctx.revert();
  }, []);
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('gotham-theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('gotham-lang') || defaultLang());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [bookingFrame, setBookingFrame] = useState(null);
  const [consent, setConsent] = useState(() => localStorage.getItem('gotham-analytics-consent'));
  const t = copy[lang] || copy.uk;
  useGsap();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('gotham-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('gotham-lang', lang);
    document.title = t.seoTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.seoDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.seoTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.seoDescription);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', t.seoTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', t.seoDescription);
    trackEvent('language_view', { language: lang });
  }, [lang, t]);

  useEffect(() => {
    if (consent?.startsWith('granted') || (!consent && isUkraineLikeRegion())) {
      loadAnalytics();
      if (!consent) localStorage.setItem('gotham-analytics-consent', 'granted_ua_default');
    }
  }, [consent]);

  const nav = useMemo(
    () => [
      [t.nav.team, '#team', 'team'],
      [t.nav.story, '#story', 'story'],
      [t.nav.booking, '#booking', 'booking'],
      [t.nav.contacts, '#contacts', 'contacts'],
    ],
    [t],
  );

  const changeLang = (nextLang) => {
    setLang(nextLang);
    trackEvent('language_change', { language: nextLang });
  };

  const handleNavClick = (event, href, key) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setMenuOpen(false);
    trackEvent('nav_click', { section: key, language: lang });
  };

  const openBooking = (url = bookingUrl, title = t.booking.modalTitle, source = 'booking') => {
    setMenuOpen(false);
    setBookingFrame({ url, title });
    trackEvent('booking_open', { source, language: lang });
  };

  return (
    <>
      <CursorAura />
      <Header
        nav={nav}
        lang={lang}
        t={t}
        theme={theme}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setTheme={setTheme}
        setLang={changeLang}
        onNavClick={handleNavClick}
        openBooking={openBooking}
      />
      {menuOpen && <button className="menu-blur-layer" type="button" aria-label="Закрити меню" onClick={() => setMenuOpen(false)} />}
      <main>
        <Hero t={t} lang={lang} openBooking={openBooking} onNavClick={handleNavClick} />
        <Gallery t={t} openBooking={openBooking} />
        <Marquee t={t} />
        <Team t={t} lang={lang} openBooking={openBooking} />
        <Booking t={t} openBooking={openBooking} />
        <Story t={t} lang={lang} />
        <FAQ t={t} activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
        <ReviewSection t={t} lang={lang} />
        <Contacts t={t} openBooking={openBooking} />
      </main>
      <Footer t={t} />
      <CookieConsent t={t} consent={consent} setConsent={setConsent} />
      <BookingModal t={t} frame={bookingFrame} onClose={() => setBookingFrame(null)} />
    </>
  );
}

function Header({ nav, lang, t, theme, menuOpen, setMenuOpen, setTheme, setLang, onNavClick }) {
  return (
    <header className="nav-shell fixed left-0 right-0 top-0 z-50 px-4 py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[color:var(--line)] bg-[color:var(--nav-bg)] px-4 py-3 shadow-2xl backdrop-blur-xl">
        <a href="#top" className="logo-mark" aria-label="GOTHAM Barbershop" onClick={(event) => onNavClick(event, '#top', 'top')}>
          <img
            src="/assets/photo-1596362601603-b74f6ef16-h_m1qkln0t.jpg"
            width="132"
            height="48"
            alt="Логотип GOTHAM Barbershop"
          />
        </a>
        <div className="nav-links">
          {nav.map(([label, href, key]) => (
            <a key={href} href={href} className="nav-link" onClick={(event) => onNavClick(event, href, key)}>
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="icon-btn"
            type="button"
            aria-label={theme === 'dark' ? t.common.themeLight : t.common.themeDark}
            onClick={() => {
              const nextTheme = theme === 'dark' ? 'light' : 'dark';
              setTheme(nextTheme);
              trackEvent('theme_change', { theme: nextTheme, language: lang });
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="lang-switch" type="button" aria-label={t.common.langLabel} onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}>
            <span className={lang === 'uk' ? 'is-active' : ''}>UA</span>
            <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
          </button>
          <a href={`tel:${phone}`} className="call-btn" onClick={() => trackEvent('call_click', { placement: 'header', language: lang })}>
            {t.common.call}
          </a>
          <button className="icon-btn menu-toggle" type="button" aria-label={t.common.menu} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-panel mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border border-[color:var(--line)] bg-[color:var(--panel-solid)] p-4 shadow-2xl">
          {nav.map(([label, href, key]) => (
            <a key={href} href={href} className="mobile-link" onClick={(event) => onNavClick(event, href, key)}>
              {label}
            </a>
          ))}
          <a href={mapsRouteUrl} target="_blank" rel="noreferrer" className="mobile-link mobile-route-menu" onClick={() => trackEvent('route_click', { placement: 'mobile_menu', language: lang })}>
            {t.common.route}
            <MapPin size={18} />
          </a>
          <a href={`tel:${phone}`} className="mobile-link mobile-link-strong" onClick={() => trackEvent('call_click', { placement: 'mobile_menu', language: lang })}>{t.common.call}</a>
        </div>
      )}
    </header>
  );
}

function Hero({ t, lang, openBooking, onNavClick }) {
  useEffect(() => {
    const hero = document.querySelector('.hero-section');
    const timer = window.setTimeout(() => hero?.classList.add('intro-done'), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="top" className="hero-section relative min-h-[100svh] overflow-hidden">
      <video
        className="hero-video-media absolute inset-0 h-full w-full object-cover"
        src="/assets/hero-video.mp4"
        poster="/assets/mainfoto.jpeg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={t.hero.videoLabel}
      />
      <div className="hero-intro" aria-hidden="true">
        <img src="/assets/mainfoto.jpeg" alt="" />
      </div>
      <div className="hero-shade" />
      <div className="noise" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-12 pt-28 md:items-center md:pb-0">
        <div className="hero-copy max-w-4xl">
          <p className="hero-reveal eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-reveal mt-5 max-w-5xl text-6xl font-extrabold uppercase leading-[0.9] text-white sm:text-7xl lg:text-8xl">
            <span>GOTHAM</span>
            <span>Barbershop</span>
          </h1>
          <p className="hero-reveal mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
            {t.hero.body}
          </p>
          <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${phone}`} className="primary-btn" onClick={() => trackEvent('call_click', { placement: 'hero', language: lang })}>
              <Phone size={19} />
              {t.common.call}
            </a>
            <button type="button" className="ghost-btn" onClick={() => openBooking(bookingUrl, t.booking.modalTitle, 'hero')}>
              <CalendarDays size={19} />
              {t.common.onlineBooking}
            </button>
            <a href="#story" className="ghost-btn" onClick={(event) => onNavClick(event, '#story', 'story')}>
              {t.hero.story}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60 md:flex">
        <span className="h-px w-10 bg-white/30" />
        scroll
        <span className="h-px w-10 bg-white/30" />
      </div>
    </section>
  );
}

function Gallery({ t, openBooking }) {
  const firstRow = [...gallery, ...gallery, ...gallery];
  const secondRow = [...gallery].reverse().concat([...gallery].reverse(), [...gallery].reverse());

  return (
    <section id="gallery" className="section atmosphere-section overflow-hidden">
      <div className="scroll-gallery" aria-label="GOTHAM Barbershop gallery">
        <div className="gallery-row gallery-row-one">
          {firstRow.map((src, index) => (
            <figure className="gallery-card" key={`top-${src}-${index}`}>
              <img
                src={src}
                loading={index > 3 ? 'lazy' : 'eager'}
                alt={t.gallery.altTop}
              />
            </figure>
          ))}
        </div>
        <div className="gallery-row gallery-row-two">
          {secondRow.map((src, index) => (
            <figure className="gallery-card" key={`bottom-${src}-${index}`}>
              <img
                src={src}
                loading="lazy"
                alt={t.gallery.altBottom}
              />
            </figure>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-5">
        <div className="atmosphere-copy reveal">
          <div>
            <p className="eyebrow">{t.gallery.eyebrow}</p>
            <h2>{t.gallery.title}</h2>
            <p>
              {t.gallery.body}
            </p>
          </div>
          <div className="atmosphere-cta">
            <h3>{t.gallery.ctaTitle}</h3>
            <button type="button" className="primary-btn cta-pulse" onClick={() => openBooking(bookingUrl, t.booking.servicesTitle, 'gallery_service')}>
              {t.gallery.service}
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ openBooking }) {
  return (
    <section className="section py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="cta-band reveal">
          <div>
            <p className="eyebrow">Точність. Атмосфера. Стиль.</p>
            <h2>Покращіть свій стиль сьогодні!</h2>
          </div>
          <button type="button" className="primary-btn" onClick={() => openBooking(bookingUrl, 'Послуги GOTHAM')}>
            Обрати послугу
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Booking({ t, openBooking }) {
  return (
    <section id="booking" className="section booking-section">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow">{t.booking.eyebrow}</p>
          <h2 className="section-title">{t.booking.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {t.booking.body}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoPill icon={<Scissors size={18} />} title={t.booking.pills[0][0]} text={t.booking.pills[0][1]} />
            <InfoPill icon={<Sparkles size={18} />} title={t.booking.pills[1][0]} text={t.booking.pills[1][1]} />
            <InfoPill icon={<Clock size={18} />} title={t.booking.pills[2][0]} text={t.booking.pills[2][1]} />
          </div>
        </div>
        <div className="booking-card reveal">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3>{t.booking.cardTitle}</h3>
            </div>
            <CalendarDays className="text-[color:var(--accent)]" size={32} />
          </div>
          <p className="mt-5 text-[color:var(--muted)]">
            {t.booking.cardBody}
          </p>
          <button type="button" className="primary-btn cta-pulse mt-7 w-full justify-center" onClick={() => openBooking(bookingUrl, t.booking.modalTitle, 'booking_section')}>
            {t.booking.open}
            <ArrowUpRight size={18} />
          </button>
          <a href={`tel:${phone}`} className="ghost-btn mt-3 w-full justify-center" onClick={() => trackEvent('call_click', { placement: 'booking_section' })}>
            <Phone size={18} />
            {displayPhone}
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ icon, title, text }) {
  return (
    <div className="info-pill">
      {icon}
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function Marquee({ t }) {
  return (
    <section className="marquee" aria-label="GOTHAM Barbershop у Хмельницькому">
      <div className="marquee-track">
        {[1, 2, 3, 4].map((item) => (
          <span key={item}>{t.marquee}</span>
        ))}
      </div>
    </section>
  );
}

function Team({ t, lang, openBooking }) {
  return (
    <section id="team" className="section">
      <div className="mx-auto max-w-7xl px-5">
        <div className="section-head reveal">
          <p className="eyebrow">{t.team.eyebrow}</p>
          <h2>{t.team.title}</h2>
        </div>
        <div className="stagger-scope mt-10 grid gap-5 md:grid-cols-3">
          {masters.map((master) => {
            const displayName = lang === 'en' ? master.nameEn : master.name;
            return (
              <button
                type="button"
                className="master-card stagger-item"
                key={master.name}
                onClick={() => openBooking(master.url, `${t.team.bookingTitle}: ${displayName}`, `master_${master.name}`)}
              >
                <img src={master.image} loading="lazy" alt={master.alt} />
                <div className="master-content">
                  <span>{t.team.eyebrow.slice(0, -1)}</span>
                  <h3>{displayName}</h3>
                  <p>{t.team.action}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Story({ t, lang }) {
  const marketYears = getMarketYears();
  const metrics = t.story.metrics.map((metric, index) => (
    index === 2 ? [String(marketYears), getMarketYearsLabel(lang, marketYears)] : metric
  ));

  return (
    <section id="story" className="section story-section">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div className="reveal sticky-block">
            <p className="eyebrow">{t.story.eyebrow}</p>
            <h2 className="section-title">{t.story.title}</h2>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {metrics.map(([value, label]) => <Metric key={`${value}-${label}`} value={value} label={label} />)}
            </div>
          </div>
          <div className="story-copy reveal">
            <p>
              {t.story.p1}
            </p>
            <p>
              {t.story.p2}
            </p>
            <p>
              {t.story.p3}
            </p>
            <h3>{t.story.join}</h3>
          </div>
        </div>
        <SocialLinks t={t} />
      </div>
    </section>
  );
}

function Metric({ value, label }) {
  const count = Number.parseInt(value, 10) || 0;
  const suffix = value.replace(String(count), '');

  return (
    <div className="metric">
      <strong className="metric-number" data-count={count} data-suffix={suffix}>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SocialLinks({ t }) {
  return (
    <div className="story-socials reveal">
      <div className="social-orbit" aria-label="Соцмережі GOTHAM Barbershop">
        <Social href="https://www.instagram.com/gotham_khm/" label="Instagram GOTHAM" icon={<Instagram size={28} />} />
        <Social href="https://www.facebook.com/gotham_khm" label="Facebook GOTHAM" icon={<Facebook size={28} />} />
        <Social href="https://www.tiktok.com/@gotham_khm" label="TikTok GOTHAM" icon={<Music2 size={28} />} />
      </div>
      <p className="social-caption">{t.story.social}</p>
    </div>
  );
}

function FAQ({ t, activeFaq, setActiveFaq }) {
  return (
    <section className="section faq-section">
      <div className="mx-auto max-w-7xl px-5">
        <div className="section-head reveal">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2>{t.faq.title}</h2>
        </div>
        <div className="faq-list mx-auto mt-8 max-w-4xl space-y-3">
          {t.faq.items.map(([question, answer], index) => (
            <article className={`faq-item reveal ${activeFaq === index ? 'is-open' : ''}`} key={question}>
              <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                <span>{question}</span>
                <ChevronDown className={activeFaq === index ? 'rotate-180' : ''} size={20} />
              </button>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewSection({ t, lang }) {
  return (
    <section className="section review-section">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow">{t.review.eyebrow}</p>
          <h2 className="section-title review-title">{t.review.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {t.review.body}
          </p>
        </div>
        <div className="review-card reveal">
          <div className="review-google-head">
            <strong>Google</strong>
            <p>{t.review.note}</p>
          </div>
          <div className="stars static-stars" aria-label="Google відгук GOTHAM Barbershop">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} aria-hidden="true">
                <Star size={26} fill="currentColor" />
              </span>
            ))}
          </div>
          <div className="review-actions">
            <a href={googleReviewUrl} target="_blank" rel="noreferrer" className="primary-btn" onClick={() => trackEvent('review_click', { language: lang })}>
              {t.review.action}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contacts({ t, openBooking }) {
  const mapRef = useRef(null);
  return (
    <section id="contacts" className="section contact-section">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="reveal">
            <p className="eyebrow">{t.contacts.eyebrow}</p>
            <h2 className="section-title">{t.contacts.title}</h2>
            <div className="contact-list mt-8">
              <a href="https://maps.google.com/?q=GOTHAM%20Barbershop%20%D0%A1%D0%BE%D0%B1%D0%BE%D1%80%D0%BD%D0%B0%2014%2F2%20%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B8%D0%B9" target="_blank" rel="noreferrer" onClick={() => trackEvent('map_click', { placement: 'contacts' })}>
                <MapPin size={19} />
                {t.contacts.address}
              </a>
              <a href={`tel:${phone}`} onClick={() => trackEvent('call_click', { placement: 'contacts' })}>
                <Phone size={19} />
                {displayPhone}
              </a>
              <button type="button" onClick={() => openBooking(bookingUrl, t.booking.modalTitle, 'contacts')}>
                <CalendarDays size={19} />
                {t.contacts.booking}
              </button>
              <a
                className="mobile-route-link"
                href={mapsRouteUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('route_click', { placement: 'contacts' })}
              >
                <MapPin size={19} />
                {t.common.route}
              </a>
            </div>
          </div>
          <div ref={mapRef} className="map-frame reveal">
            <iframe
              title={t.contacts.mapTitle}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2594.946910571441!2d26.981754099999996!3d49.428817699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473207e58d9c1a31%3A0xc77e52681197280a!2z0JHQsNGA0LHQtdGA0YjQvtCIEdvdGhhbQ!5e0!3m2!1suk!2sua!4v1736185449907!5m2!1suk!2sua"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Social({ href, label, icon, text }) {
  return (
    <a className="social-btn" href={href} aria-label={label} target="_blank" rel="noreferrer" onClick={() => trackEvent('social_click', { network: label })}>
      {icon || <span>{text}</span>}
    </a>
  );
}

function Footer({ t }) {
  return (
    <footer className="border-t border-[color:var(--line)] px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-[color:var(--muted)] md:flex-row md:text-left">
        <p>{t.footer}</p>
        <p>
          Developed by{' '}
          <a className="underline underline-offset-4" href="https://abs-studio.de/" target="_blank" rel="noreferrer">
            ABS Studio
          </a>
        </p>
      </div>
    </footer>
  );
}

function BookingModal({ t, frame, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!frame) return undefined;
    setIsLoading(true);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [frame, onClose]);

  if (!frame) return null;

  return (
    <div className="booking-modal" role="dialog" aria-modal="true" aria-label={frame.title}>
      <button className="modal-backdrop" type="button" aria-label="Закрити запис" onClick={onClose} />
      <div className="modal-card">
        <div className="modal-head">
          <div>
            <p className="eyebrow">GOTHAM booking</p>
            <h2>{frame.title}</h2>
          </div>
          <button className="icon-btn" type="button" aria-label={t.common.close} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {isLoading && (
          <div className="modal-loader" role="status" aria-live="polite">
            <span />
            <strong>{t.booking.loadingTitle}</strong>
            <p>{t.booking.loadingBody}</p>
          </div>
        )}
        <iframe
          title={frame.title}
          src={frame.url}
          loading="eager"
          allow="payment; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}

function CookieConsent({ t, consent, setConsent }) {
  const shouldAsk = !consent && !isUkraineLikeRegion();
  if (!shouldAsk) return null;

  const choose = (value) => {
    localStorage.setItem('gotham-analytics-consent', value);
    setConsent(value);
    if (value === 'granted') {
      loadAnalytics();
      trackEvent('cookie_consent', { value });
    }
  };

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t.consent.title}>
      <div>
        <strong>{t.consent.title}</strong>
        <p>{t.consent.body}</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="ghost-btn" onClick={() => choose('denied')}>
          {t.consent.reject}
        </button>
        <button type="button" className="primary-btn" onClick={() => choose('granted')}>
          {t.consent.accept}
        </button>
      </div>
    </div>
  );
}

function CursorAura() {
  const auraRef = useRef(null);

  useEffect(() => {
    const aura = auraRef.current;
    if (!aura) return undefined;

    const move = (x, y) => {
      aura.style.setProperty('--x', `${x}px`);
      aura.style.setProperty('--y', `${y}px`);
      aura.classList.add('is-active');
    };
    const onPointerMove = (event) => move(event.clientX, event.clientY);
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) move(touch.clientX, touch.clientY);
    };
    const onPointerDown = () => {
      aura.classList.remove('is-rippling');
      void aura.offsetWidth;
      aura.classList.add('is-rippling');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return <div ref={auraRef} className="cursor-aura" aria-hidden="true" />;
}

createRoot(document.getElementById('root')).render(<App />);
