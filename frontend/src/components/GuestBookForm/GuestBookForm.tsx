import React, {useState} from 'react';
import {GuestBookDataForm} from '../../types';
import {toast} from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import FileInput from '../FileInput/FileInput';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectIsModalStatus, selectIsPostLoading, showModal} from '../../store/guestBookSlice';
import {postGuestBook} from '../../store/guestBookThunks';
import {LoadingButton} from '@mui/lab';

const GuestBookForm = () => {
  const [guestBookData, setGuestBookData] = useState<GuestBookDataForm>({
    author: '',
    message: '',
    image: null,
  });
  const [resetFileName, setResetFileName] = useState(false);
  const dispatch = useAppDispatch();
  const isModalStatus = useAppSelector(selectIsModalStatus);
  const isLoading = useAppSelector(selectIsPostLoading);

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setGuestBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setGuestBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (guestBookData.message.trim().length !== 0) {

        guestBookData.author.trim();
        await dispatch(postGuestBook(guestBookData)).unwrap();
        setGuestBookData({
          author: '',
          message: '',
          image: null,
        });

        setResetFileName(true);
        dispatch(showModal(false));
        toast.success('Запись была успешно добавлена.');
      }
    } catch (error) {
      console.error(error + 'Произошла ошибка при отправке запроса, попробуйте позже.');
      toast.error('Произошла ошибка при отправке запроса, попробуйте позже.');
    }
  };

  return (
    <>
      {isModalStatus && (
        <Dialog open={isModalStatus} onClose={() => dispatch(showModal(false))} maxWidth="sm">
          <DialogTitle>
            Гостевая книга
            <IconButton  onClick={() => dispatch(showModal(false))} sx={{position: 'absolute', right: 8, top: 8,}}>
              <CloseIcon/>
            </IconButton>
          </DialogTitle>
          <Box component="form" onSubmit={onSubmitForm}>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={onFieldChange}
                    label="Автор"
                    id="author"
                    name="author"
                    value={guestBookData.author}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={onFieldChange}
                    label="Сообщение"
                    id="message"
                    name="message"
                    value={guestBookData.message}
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item>
                  <FileInput
                    onChange={onChangeFileInput}
                    label="Изображение"
                    name="image"
                    resetFileName={resetFileName}
                    handleResetFileName={handleResetFileName}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{pt: 2, pb: 2}}>
              <Button onClick={() => dispatch(showModal(false))} color="error" variant="contained" startIcon={<CancelIcon/>}>
                Закрыть
              </Button>
              <LoadingButton
                color="primary"
                type="submit"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SendIcon />}
                variant="contained">
                <span>Добавить</span>
              </LoadingButton>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default GuestBookForm;