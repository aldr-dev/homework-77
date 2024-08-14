import {Button, Container, Typography} from '@mui/material';
import GuestBookForm from '../../components/GuestBookForm/GuestBookForm';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{mt: 5, mb: 5}}>
      <Typography variant="h4" sx={{mb: 2}}>Приложение - гостевая книга</Typography>
      <GuestBookForm/>
      <Button variant="contained" endIcon={<AddIcon/>}>Оставить запись</Button>
    </Container>
  );
};

export default Home;