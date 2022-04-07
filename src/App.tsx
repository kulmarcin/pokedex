import styles from './App.module.scss';
import PokemonList from './components/PokemonList/PokemonList';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { changeTheme, selectTheme } from './components/Theme/ThemeSlice';

function App() {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <div className={theme === 'light' ? styles.App : styles['App--dark']}>
      <h1>PokeDex</h1>
      <button
        className={theme === 'light' ? styles.Button : styles['Button--dark']}
        onClick={handleTheme}
      >
        Change to:{' '}
        <span style={{ fontWeight: 'bold' }}>
          {theme === 'light' ? 'dark' : 'light'}
        </span>{' '}
        theme
      </button>
      <PokemonList />
    </div>
  );
}

export default App;
