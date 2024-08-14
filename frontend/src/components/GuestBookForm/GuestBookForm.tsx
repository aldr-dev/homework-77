import React, {useState} from 'react';
import {GuestBookFormField} from '../../types';
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

const GuestBookForm = () => {
  const [guestBookData, setGuestBookData] = useState<GuestBookFormField>({
    author: '',
    message: '',
    image: null,
  });
  const [resetFileName, setResetFileName] = useState(false);

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
        setGuestBookData({
          author: '',
          message: '',
          image: null,
        });

        setResetFileName(true);
        toast.success('Запись была успешно добавлена.');
      }
    } catch (error) {
      console.error(error + 'Произошла ошибка при отправке запроса, попробуйте позже.');
      toast.error('Произошла ошибка при отправке запроса, попробуйте позже.');
    }
  };

  return (
    <Dialog open={true} maxWidth="sm">
      <DialogTitle>
        Гостевая книга
        <IconButton aria-label="close" sx={{position: 'absolute', right: 8, top: 8,}}>
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
          <Button color="error" variant="contained" startIcon={<CancelIcon/>}>
            Закрыть
          </Button>
          <Button color="primary" type="submit" variant="contained" startIcon={<SendIcon/>}>
            Добавить
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default GuestBookForm;