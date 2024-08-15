import {configureStore} from '@reduxjs/toolkit';
import {guestBookReducer} from '../store/guestBookSlice';

export const store = configureStore({
  reducer: {
    guestBook: guestBookReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;