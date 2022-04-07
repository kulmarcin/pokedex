import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState: string = 'light';

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: state => {
      return state === 'light' ? 'dark' : 'light';
    }
  }
});

export const { changeTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
