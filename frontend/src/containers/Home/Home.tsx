import {Box, Button, CircularProgress, Container, Typography} from '@mui/material';
import GuestBookForm from '../../components/GuestBookForm/GuestBookForm';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectGuestBookData, selectIsFetchLoading, showModal} from '../../store/guestBookSlice';
import CardGuestBook from '../../components/CardGuestBook/CardGuestBook';
import {useEffect} from 'react';
import {fetchGuestBook} from '../../store/guestBookThunks';
import {toast} from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();
  const guestBookData = useAppSelector(selectGuestBookData);
  const isFetchLoading = useAppSelector(selectIsFetchLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchGuestBook()).unwrap();
      } catch (error) {
        console.error(error + 'Произошла ошибка при попытке получия данных с сервера.');
        toast.error('Произошла ошибка при попытке получия данных с сервера.');
      }
    };
    void fetchData();
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{mt: 5, mb: 5}}>
      <Typography variant="h4" sx={{mb: 2}}>Приложение - гостевая книга</Typography>
      <GuestBookForm/>
      <Button onClick={() => dispatch(showModal(true))} variant="contained" endIcon={<AddIcon/>}>Оставить
        запись</Button>

      {isFetchLoading && (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
          <CircularProgress/>
        </Box>
      )}

      {!isFetchLoading && guestBookData.length === 0 && (
        <Typography sx={{mt: 2}} variant="body1">Список гостевой книги пуст. Оставьте запись...</Typography>
      )}

      {!isFetchLoading && guestBookData.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '400px',
            overflowX: 'auto',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            mt: 3,
          }}>
          {guestBookData.map((item) => (
            <CardGuestBook key={item.id} data={item}/>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Home;