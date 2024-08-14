import {Container} from '@mui/material';
import GuestBookForm from '../../components/GuestBookForm/GuestBookForm';


const Home = () => {
  return (
    <Container maxWidth="lg">
      <GuestBookForm />
    </Container>
  );
};

export default Home;