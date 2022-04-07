import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../components/PokemonList/PokemonSlice';
import urlsReducer from '../components/PokemonList/UrlSlice';
import themeReducer from '../components/Theme/ThemeSlice';

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    urls: urlsReducer,
    theme: themeReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
