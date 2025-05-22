export default function robots() {
  return {
    rules: {
      userAgent: ['*', 'Yandex', 'Google'],
      allow: '/',
      disallow: [
        '/public',
        '/lk',
        '/lk/guide',
        '/lk/booking',
        '/lk/checkout',
        '/lk/login',
        '/lk/profile',
        '/lk/trainers',
        '/lk/workouts',
      ],
      host: 'gymyx.ru',
    },
    sitemap: 'https://gymyx.ru/sitemap.xml',
  };
}
