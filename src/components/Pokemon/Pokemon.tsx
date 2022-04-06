import { useState } from 'react';
import styles from './Pokemon.module.scss';

interface Props {
  id: number;
  sprite: string;
  name: string;
  type: string[];
  height: number;
  weight: number;
}

export default function Pokemon({
  id,
  sprite,
  name,
  type,
  height,
  weight
}: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(prevState => !prevState);
  };

  return (
    <div className={styles.Element} key={id} onClick={handleClick}>
      <img src={sprite} alt="sprite" />
      {!clicked ? (
        <div className={styles.Desc}>
          <p className={styles.Name}>{name.toUpperCase()}</p>
          <p className={styles.Type}>{type.join('/')}</p>
        </div>
      ) : (
        <div className={styles.Desc}>
          <p className={styles.Height}>Height: {height}ft</p>
          <p className={styles.Weight}>Weight: {weight}kg</p>
        </div>
      )}
    </div>
  );
}
