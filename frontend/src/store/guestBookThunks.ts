import {createAsyncThunk} from '@reduxjs/toolkit';
import {GuestBookData, GuestBookDataForm} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const fetchGuestBook = createAsyncThunk<GuestBookData[], void, { state: RootState }>(
  'guestBook/fetchGuestBook', async () => {
    const response = await axiosApi.get<GuestBookData[]>('/guestBooks');
    return response.data;
  }
);

export const postGuestBook = createAsyncThunk<void, GuestBookDataForm, { state: RootState }>(
  'guestBook/postGuestBook', async (data) => {
    const formData = new FormData();
    formData.append('author', data.author);
    formData.append('message', data.message);

    if (data.image) {
      formData.append('image', data.image);
    }

    await axiosApi.post<GuestBookData>('/guestBooks', formData);
  }
);