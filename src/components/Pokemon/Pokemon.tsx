import { useState } from 'react';
import styles from './Pokemon.module.scss';

interface Props {
  sprite: string;
  name: string;
  type: string[];
  height: number;
  weight: number;
}

export default function Pokemon({ sprite, name, type, height, weight }: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(prevState => !prevState);
  };

  return (
    <div className={styles.Element} onClick={handleClick}>
      <img src={sprite} alt="sprite" />

      {!clicked && (
        <div className={styles.Desc}>
          <p className={styles.Name}>{name.toUpperCase()}</p>
          <p className={styles.Type}>{type.join('/')}</p>
        </div>
      )}

      {clicked && (
        <div className={styles.Desc}>
          <p className={styles.Height}>Height: {height / 10}m</p>
          <p className={styles.Weight}>Weight: {weight / 10}kg</p>
        </div>
      )}
    </div>
  );
}
