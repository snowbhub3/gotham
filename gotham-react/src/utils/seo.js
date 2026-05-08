export const updateMetaTags = (title, description, url = '') => {
  document.title = title;
  
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  if (url) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);
  }
};

export const addJsonLd = (schema) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'GOTHAM Barbershop',
  'description': 'Преміальна чоловіча стрижка у центрі Хмельницького',
  'image': 'https://r.mobirisesite.com/748350/assets/images/mainfoto-p-1080.jpeg',
  'telephone': '+38068895862',
  'email': 'gotham@barbershop.ua',
  'url': 'https://gotham.com.ua',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'вул. Кам\'янецька',
    'addressLocality': 'Хмельницький',
    'addressRegion': 'Хмельницька область',
    'postalCode': '29000',
    'addressCountry': 'UA'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 49.428818,
    'longitude': 26.981754
  },
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '10:00',
      'closes': '20:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Saturday', 'Sunday'],
      'opens': '10:00',
      'closes': '18:00'
    }
  ],
  'sameAs': [
    'https://www.facebook.com/gotham_khm',
    'https://www.instagram.com/gotham_khm/',
    'https://www.tiktok.com/@gotham_khm'
  ],
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.8',
    'reviewCount': '700'
  },
  'priceRange': '$$'
});
