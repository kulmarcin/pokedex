import { useEffect, useState } from 'react';
import styles from './PokemonList.module.scss';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  push,
  selectPokemons,
  sort,
  findOne,
  findByType,
  clear
} from './PokemonSlice';
import { goNext, next, selectUrls } from './UrlSlice';
import { selectTheme } from '../../components/Theme/ThemeSlice';

import Pokemon from '../Pokemon/Pokemon';

interface firstFetch {
  name: string;
  url: string;
}

interface secondFetch {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: [{ type: { name: string } }];
  id: number;
}

interface typeFetch {
  pokemon: { name: string; url: string };
}

export default function PokemonList() {
  const pokemons = useAppSelector(selectPokemons);
  const urls = useAppSelector(selectUrls);
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [currentUrl, setCurrentUrl] = useState(urls.current);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<[] | string[]>([]);
  const [userSearch, setUserSearch] = useState(false);

  useEffect(() => {
    setCurrentUrl(urls.current);
  }, [urls]);

  useEffect(() => {
    setLoading(true);

    fetch(currentUrl)
      .then(data => data.json())
      .then(data => {
        dispatch(next(data.next));

        data.results.forEach((el: firstFetch) => {
          let url = el.url;

          fetch(url)
            .then(data => data.json())
            .then((data: secondFetch) => {
              const obj = {
                name: data.name,
                type: data.types.map(el => el.type.name),
                sprite: data.sprites.front_default,
                height: data.height,
                weight: data.weight,
                id: data.id
              };

              dispatch(push(obj));
            });
        });
      })
      .then(() => setLoading(false));
  }, [currentUrl, dispatch]);

  useEffect(() => {
    if (!loading) {
      dispatch(sort());
    }
  });

  const handleNext = () => {
    dispatch(goNext());
  };

  const handleBack = () => {
    setError([]);
    setUserSearch(false);
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError([]);
    setQuery(e.target.value);
  };

  const handleSendQuery = () => {
    setLoading(true);
    dispatch(clear());
    setError([]);

    fetch(`https://pokeapi.co/api/v2/type/${query.toLowerCase()}`)
      .then(data => data.json())
      .then(data => {
        data.pokemon.forEach((el: typeFetch) => {
          let url = el.pokemon.url;
          fetch(url)
            .then(data => data.json())
            .then((data: secondFetch) => {
              const obj = {
                name: data.name,
                type: data.types.map(el => el.type.name),
                sprite: data.sprites.front_default,
                height: data.height,
                weight: data.weight,
                id: data.id
              };
              setUserSearch(true);
              dispatch(findByType(obj));
            });
        });
      })
      .catch(err => setError(prevState => [...prevState, 'Type Not Found!']))
      .then(() => setLoading(false));

    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      .then(data => data.json())
      .then(data => {
        const obj = {
          name: data.name,
          type: data.types.map((el: any) => el.type.name),
          sprite: data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          id: data.id
        };
        setUserSearch(true);
        dispatch(findOne(obj));
      })
      .catch(err => setError(prevState => [...prevState, 'Name Not Found!']))
      .then(() => setLoading(false));
  };

  return (
    <div>
      <input
        className={theme === 'light' ? styles.Input : styles['Input--dark']}
        type="text"
        placeholder="Enter type or name"
        onChange={handleChange}
        onKeyDownCapture={e => {
          if (e.key === 'Enter') {
            handleSendQuery();
          }
        }}
      />
      <button
        disabled={query.length > 0 ? false : true}
        className={theme === 'light' ? styles.Search : styles['Search--dark']}
        onClick={handleSendQuery}
      >
        Search
      </button>

      {userSearch && (
        <button
          className={theme === 'light' ? styles.Back : styles['Back--dark']}
          onClick={handleBack}
        >
          Go Back
        </button>
      )}

      {error.length === 2 &&
        error.map(el => <p style={{ color: 'red' }}>{el}</p>)}
      <div className={styles.PokemonList}>
        {pokemons.map(el => {
          return (
            <Pokemon
              key={el.id}
              sprite={el.sprite}
              name={el.name}
              type={el.type}
              height={el.height}
              weight={el.weight}
            />
          );
        })}

        {loading && (
          <div
            className={
              theme === 'light' ? styles.Element : styles['Element--dark']
            }
          >
            <div
              className={
                theme === 'light' ? styles.ldsring : styles['ldsring--dark']
              }
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}

        {!loading && !userSearch && error.length === 0 && (
          <div
            className={
              theme === 'light' ? styles.Button : styles['Button--dark']
            }
            onClick={handleNext}
          >
            Load more
          </div>
        )}
      </div>
    </div>
  );
}
