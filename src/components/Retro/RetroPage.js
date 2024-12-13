
import { useEffect, useState } from 'react';
import styles from '../../styles/RetroProducts.module.css';

const RetroProducts = [
  { id: 1, name: 'Cassette Player', description: 'Relive the 80s with classic cassette tunes.', price: '$50' },
  { id: 2, name: 'Polaroid Camera', description: 'Capture instant memories, retro style.', price: '$120' },
  { id: 3, name: 'Arcade Console', description: 'Play classic 90s arcade games.', price: '$300' },
];

export default function RetroPage() {
  const [environment, setEnvironment] = useState(null);

  useEffect(() => {
    setEnvironment(process.env.NEXT_PUBLIC_OLD_PRODUCTS || 'default');
  }, []);

  // if (environment !== '0') {
  //   return <div className={styles.notice}>Environment is not set to 0.</div>;
  // }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Retro Products from the 80s–90s</h1>
      </header>
      <main className={styles.main}>
        {RetroProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span className={styles.price}>{product.price}</span>
          </div>
        ))}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Retro Products Store</p>
      </footer>
    </div>
  );
}
