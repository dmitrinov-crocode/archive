import Container from '@/Components/Container';
import TrainersSlider from '@/Sections/Account/Trainers/TrainersSlider';

export const getTrainersData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/trainers`, { cache: 'no-store' });

  const response = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return response;
};

const Trainings = async () => {
  return (
    <section className="trainers-page-wrapper">
      <Container>
        <TrainersSlider isShowVideo={true}/>
      </Container>
    </section>
  );
};

export default Trainings;
