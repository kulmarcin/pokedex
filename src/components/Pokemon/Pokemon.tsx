import React, { useState } from 'react';
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

  const classDesc = theme === 'light' ? styles.Desc : styles['Desc--dark'];
  const className = theme === 'light' ? styles.Name : styles['Name--dark'];
  const classType = theme === 'light' ? styles.Type : styles['Type--dark'];

  return (
    <div
      className={theme === 'light' ? styles.Element : styles['Element--dark']}
      onClick={handleClick}
    >
      <img src={sprite} alt="sprite" />
      <div className={classDesc}>
        {!clicked ? (
          <React.Fragment>
            <p className={className}>{name.toUpperCase()}</p>
            <p className={classType}>{type.join('/')}</p>
          </React.Fragment>
        ) : (
          <>
            <p className={className}>Height: {height / 10}m</p>
            <p className={classType}>Weight: {weight / 10}kg</p>
          </>
        )}
      </div>
    </div>
  );
}
