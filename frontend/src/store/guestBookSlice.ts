import {GuestBookData} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchGuestBook, postGuestBook} from './guestBookThunks';

export interface GuestBookState {
  guestBookData: GuestBookData[];
  isFetchLoading: boolean;
  isPostLoading: boolean;
  isModalStatus: boolean;
}

const initialState: GuestBookState = {
  guestBookData: [],
  isFetchLoading: false,
  isPostLoading: false,
  isModalStatus: false,
};

export const guestBookSlice = createSlice({
  name: 'guestBook',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
      state.isModalStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGuestBook.pending, (state) => {
      state.isFetchLoading = true;
    });
    builder.addCase(fetchGuestBook.fulfilled, (state, {payload: data}) => {
      state.isFetchLoading = false;
      state.guestBookData = data;
    });
    builder.addCase(fetchGuestBook.rejected, (state) => {
      state.isFetchLoading = false;
    });

    builder.addCase(postGuestBook.pending, (state) => {
      state.isPostLoading = true;
    });
    builder.addCase(postGuestBook.fulfilled, (state) => {
      state.isPostLoading = false;
    });
    builder.addCase(postGuestBook.rejected, (state) => {
      state.isPostLoading = false;
    });
  },
  selectors: {
    selectGuestBookData: (state) => state.guestBookData,
    selectIsFetchLoading: (state) => state.isFetchLoading,
    selectIsPostLoading: (state) => state.isPostLoading,
    selectIsModalStatus: (state) => state.isModalStatus,
  },
});

export const guestBookReducer = guestBookSlice.reducer;
export const {showModal} = guestBookSlice.actions;
export const {
  selectGuestBookData,
  selectIsFetchLoading,
  selectIsPostLoading,
  selectIsModalStatus,
} = guestBookSlice.selectors;