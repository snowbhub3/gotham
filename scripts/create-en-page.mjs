import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const enDir = path.join(distDir, 'en');
const enPath = path.join(enDir, 'index.html');

const ukTitle = 'GOTHAM Barbershop | Твій барбершоп у Хмельницькому';
const enTitle = 'GOTHAM Barbershop | Your Barbershop in Khmelnytskyi';
const ukDescription =
  'Знаходимося в центрі Хмельницького, у нас: стильні чоловічі стрижки, моделювання бороди, хімічна завивка — усе швидко та якісно. Запис онлайн або за телефоном — зручно та легко.&#10;Вул. Соборна 14/2, тел. +380 68 898 58 62.';
const enDescription =
  'Located in the center of Khmelnytskyi, we offer stylish men’s haircuts, beard trimming and men’s perm — all done quickly and professionally. Book online or by phone — easy and convenient.&#10;Soborna 14/2, tel. +380 68 898 58 62.';
const ukSchemaDescription =
  'Знаходимося в центрі Хмельницького, у нас: стильні чоловічі стрижки, моделювання бороди, хімічна завивка — усе швидко та якісно. Запис онлайн або за телефоном — зручно та легко. Вул. Соборна 14/2, тел. +380 68 898 58 62.';
const enSchemaDescription =
  'Located in the center of Khmelnytskyi, we offer stylish men’s haircuts, beard trimming and men’s perm — all done quickly and professionally. Book online or by phone — easy and convenient. Soborna 14/2, tel. +380 68 898 58 62.';
const ukKeywords =
  'барбершоп Хмельницький, барбершоп центр Хмельницький, барбер поруч, де постригтись Хмельницький, чоловіча стрижка Хмельницький, стрижка бороди Хмельницький, barber shop Khmelnytskyi';
const enKeywords =
  'barbershop Khmelnytskyi, barber shop Khmelnytskyi, barber near me Khmelnytskyi, men’s haircut Khmelnytskyi, beard trim Khmelnytskyi, premium barbershop Khmelnytskyi, haircut near me Khmelnytskyi';

let html = await readFile(indexPath, 'utf8');

html = html
  .replace('<html lang="uk">', '<html lang="en">')
  .replaceAll(ukTitle, enTitle)
  .replaceAll(ukDescription, enDescription)
  .replace(ukKeywords, enKeywords)
  .replace('<link rel="canonical" href="https://gotham.com.ua/" />', '<link rel="canonical" href="https://gotham.com.ua/en/" />')
  .replace('<meta property="og:locale" content="uk_UA" />', '<meta property="og:locale" content="en_US" />')
  .replace('<meta property="og:url" content="https://gotham.com.ua/" />', '<meta property="og:url" content="https://gotham.com.ua/en/" />')
  .replace('"@id": "https://gotham.com.ua/#webpage"', '"@id": "https://gotham.com.ua/en/#webpage"')
  .replace('"url": "https://gotham.com.ua/",\n        "name": "GOTHAM Barbershop | Your Barbershop in Khmelnytskyi"', '"url": "https://gotham.com.ua/en/",\n        "name": "GOTHAM Barbershop | Your Barbershop in Khmelnytskyi"')
  .replace(ukSchemaDescription, enSchemaDescription)
  .replace('GOTHAM Barbershop у центрі Хмельницького', 'GOTHAM Barbershop in central Khmelnytskyi')
  .replace(
    '"description": "GOTHAM Barbershop у центрі Хмельницького: стильні чоловічі стрижки, моделювання бороди, хімічна завивка, онлайн-запис або запис за телефоном."',
    '"description": "GOTHAM Barbershop in central Khmelnytskyi: stylish men’s haircuts, beard trimming, men’s perm, online booking or booking by phone."',
  )
  .replace('"streetAddress": "вул. Соборна 14/2"', '"streetAddress": "Soborna St. 14/2"')
  .replace('"addressLocality": "Хмельницький"', '"addressLocality": "Khmelnytskyi"')
  .replace('"name": "Послуги GOTHAM Barbershop"', '"name": "GOTHAM Barbershop services"')
  .replace('"name": "Чоловіча стрижка у Хмельницькому"', '"name": "Men’s haircut in Khmelnytskyi"')
  .replace('"name": "Моделювання бороди у Хмельницькому"', '"name": "Beard trimming in Khmelnytskyi"')
  .replace('"name": "Хімічна завивка для чоловіків у Хмельницькому"', '"name": "Men’s perm in Khmelnytskyi"')
  .replace('"inLanguage": "uk-UA"', '"inLanguage": "en"');

await mkdir(enDir, { recursive: true });
await writeFile(enPath, html);
