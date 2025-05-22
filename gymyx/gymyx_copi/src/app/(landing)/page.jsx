import Hero from '@/Sections/landing/Hero';
import AboutUs from '@/Sections/landing/AboutUs';
import Advantages from '@/Sections/landing/Advantages';
import Prices from '@/Sections/landing/Prices';
import ChooseHealth from '@/Sections/landing/ChooseHealth';
import Equipment from '@/Sections/landing/Equipment';
import Map from '@/Sections/landing/Map';
import Faq from '@/Sections/landing/Faq';
import Studio from '@/Sections/landing/Studio';
import Trainers from '@/Sections/landing/Trainers';

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

const SECTION_MAP = {
  banner: (props) => <Hero {...props} />,
  advantages: (props) => <Advantages {...props} />,
  aboutUs: (props) => <AboutUs {...props} />,
  Prices: (props) => <Prices {...props} />,
  banner_photo: (props) => <ChooseHealth {...props} />,
  studio: (props) => <Studio {...props} />,
  Equipment: (props) => <Equipment {...props} />,
  map: (props) => <Map {...props} />,
  faq: (props) => <Faq {...props} />,
  trainers_list: (props) => <Trainers {...props} />,
};

export default async function Home() {
  const { data } = await getData();

  const sections = data.modules.map((section) => section);

  const SECTIONS_RENDER = sections
    ? sections.map(({ name, alias, fields }) => {
        if (alias != 'header' && alias != 'footer') {
          const SectionComponent = SECTION_MAP[alias];
          return <SectionComponent key={alias} alias={alias} fields={fields} />;
        }
      })
    : null;

  return <>{SECTIONS_RENDER}</>;
}
