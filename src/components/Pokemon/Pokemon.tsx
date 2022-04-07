import { useState } from 'react';
import styles from './Pokemon.module.scss';

import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../components/Theme/ThemeSlice';

interface Props {
  sprite: string;
  name: string;
  type: string[];
  height: number;
  weight: number;
}

export default function Pokemon({ sprite, name, type, height, weight }: Props) {
  const theme = useAppSelector(selectTheme);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(prevState => !prevState);
  };

  const class1 = theme === 'light' ? styles.Desc : styles['Desc--dark'];
  const class2 = theme === 'light' ? styles.Name : styles['Name--dark'];
  const class3 = theme === 'light' ? styles.Type : styles['Type--dark'];

  return (
    <div
      className={theme === 'light' ? styles.Element : styles['Element--dark']}
      onClick={handleClick}
    >
      <img src={sprite} alt="sprite" />

      {!clicked && (
        <div className={class1}>
          <p className={class2}>{name.toUpperCase()}</p>
          <p className={class3}>{type.join('/')}</p>
        </div>
      )}

      {clicked && (
        <div className={class1}>
          <p className={class2}>Height: {height / 10}m</p>
          <p className={class3}>Weight: {weight / 10}kg</p>
        </div>
      )}
    </div>
  );
}
