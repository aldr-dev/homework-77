import {GuestBookData} from '../../types';
import React from 'react';
import {Box, CardMedia, Grid, Typography} from '@mui/material';
import {API_URL} from '../../config';

interface Props {
  data: GuestBookData;
}

const CardGuestBook: React.FC<Props> = ({data}) => {
  const image = `${API_URL}/${data.image}`;

  return (
    <Grid container alignItems="center" sx={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px', mb: 1}}>
      {data.image && (
        <Grid item sx={{display: 'flex', alignItems: 'center', width: '50px', marginRight: '10px'}}>
          <CardMedia
            component="img"
            height="50"
            width="50"
            image={image}
            alt={data.author || 'Аноним'}
            sx={{borderRadius: '50%', objectFit: 'cover'}}
          />
        </Grid>
      )}
      <Grid item>
        <Box>
          <Typography variant="body1">
            <b>Автор:</b> {data.author || 'Аноним'}
          </Typography>
          <Typography variant="body1" sx={{marginTop: '8px'}}>
            <b>Сообщение:</b> {data.message}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardGuestBook;