import {Button, Container, Typography} from '@mui/material';
import GuestBookForm from '../../components/GuestBookForm/GuestBookForm';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch} from '../../app/hooks';
import {showModal} from '../../store/guestBookSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="lg" sx={{mt: 5, mb: 5}}>
      <Typography variant="h4" sx={{mb: 2}}>Приложение - гостевая книга</Typography>
      <GuestBookForm/>
      <Button onClick={() => dispatch(showModal(true))} variant="contained" endIcon={<AddIcon/>}>Оставить запись</Button>
    </Container>
  );
};

export default Home;