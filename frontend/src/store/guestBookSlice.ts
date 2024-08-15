import {GuestBookData} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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