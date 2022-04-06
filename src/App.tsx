import styles from './App.module.scss';
import PokemonList from './components/PokemonList/PokemonList';

function App() {
  return (
    <div className={styles.App}>
      <h1>PokeDex</h1>
      <PokemonList />
    </div>
  );
}

export default App;
