import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Urls {
  current: string;
  next: string | null;
  previous: string | null;
}

const initialState: Urls = {
  current: 'https://pokeapi.co/api/v2/pokemon/',
  next: null,
  previous: null
};

export const urlsSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    next: (state, action: PayloadAction<string>) => {
      state.next = action.payload;
    },
    goNext: state => {
      if (state.next) {
        state.current = state.next;
      }
    }
  }
});

export const { next, goNext } = urlsSlice.actions;

export const selectUrls = (state: RootState) => state.urls;

export default urlsSlice.reducer;
