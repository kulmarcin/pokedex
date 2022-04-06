import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../components/PokemonList/PokemonSlice';
import urlsReducer from '../components/PokemonList/UrlSlice';

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    urls: urlsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
