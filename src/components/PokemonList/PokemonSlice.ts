import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Pokemon {
  name: string;
  type: string[];
  sprite: string;
  height: number;
  weight: number;
  id: number;
}

const initialState: Pokemon[] = [];

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<Pokemon>) => {
      state.push(action.payload);
    },
    sort: state => {
      state.sort((a, b) => {
        console.log(a, b);
        return a.id - b.id;
      });
      return state;
    }
  }
});

export const { push, sort } = pokemonsSlice.actions;
export const selectPokemons = (state: RootState) => state.pokemons;
export default pokemonsSlice.reducer;
