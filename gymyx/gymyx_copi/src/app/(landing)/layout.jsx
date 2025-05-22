import { Montserrat } from 'next/font/google';
import './../globalsLanding.scss';

import Header from '@/Sections/Header';
import Footer from '@/Sections/landing/Footer';

import { Providers } from '@/Components/Providers';
import Metrika from '@/Components/Metrika';
const MontserratFont = Montserrat({ subsets: ['latin'] });

import { authConfig } from '@/configs/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Gymyx - индивидуальная фитнес-студия',
  description:
    'Фитнес-студия с почасовой арендой, внутри есть все необходимое оборудование: кардио-зона, свободные веса, музыка, кондиционер, а также душевая и туалет. Выберете удобное время, забронируйте и тренируйтесь! ЖК "Саларьево Парк" Станция метро: Филатов Луг/Прокшино',
  manifest: '/manifest.json',
  keywords: [
    'фитнес-студия',
    'филатов луг',
    'спорт зал',
    'тренажерный зал',
    'саларьево',
    'жк саларьево парк',
    'gymyx',
    'спорт',
  ],
  icons: {
    apple: [{ url: '/icon-192x192.png' }, { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
    other: [
      {
        rel: 'icon-192x192.png',
        url: '/icon-192x192.png',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/index`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function LandingLayout({ children }) {
  const { data } = await getData();
  const session = await getServerSession(authConfig);
  const redirectBlock = !children?.props?.childPropSegment?.includes('redirect');

  if (session && session?.user.email && redirectBlock) {
    redirect('/lk/profile');
  }

  const headerData = data.modules.find((item) => item.alias === 'header');
  const heroData = data.modules.find((item) => item.alias === 'banner');

  const footerData = data.modules.find((item) => item.alias === 'footer');

  return (
    <html lang="en">
      <link rel="preload" href={`${heroData.fields[0].value}?w=390&h=844`} as="image" />
      <Metrika />
      <head>
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=optional:100,200,300,regular,500,600,700,800,900" rel="stylesheet" />
      </head>
      <body className={MontserratFont.className}>
        <Providers>
          <Header isLanding={true} data={headerData} />
          <main className="main">{children}</main>
          <Footer data={footerData} />
        </Providers>
      </body>
    </html>
  );
}
