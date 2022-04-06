import { useEffect, useState } from 'react';
import styles from './PokemonList.module.scss';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { push, selectPokemons, sort } from './PokemonSlice';
import { goNext, next, selectUrls } from './UrlSlice';

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

export default function PokemonList() {
  const pokemons = useAppSelector(selectPokemons);
  const urls = useAppSelector(selectUrls);
  const dispatch = useAppDispatch();

  const [currentUrl, setCurrentUrl] = useState(urls.current);

  const [loading, setLoading] = useState(true);
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

  return (
    <div className={styles.PokemonList}>
      {pokemons.map(el => {
        return (
          <Pokemon
            id={el.id}
            sprite={el.sprite}
            name={el.name}
            type={el.type}
            height={el.height}
            weight={el.weight}
          />
        );
      })}
      {loading ? (
        <div className={styles.Element}>
          <div className={styles.ldsring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className={styles.Button} onClick={handleNext}>
          Load more
        </div>
      )}
    </div>
  );
}
