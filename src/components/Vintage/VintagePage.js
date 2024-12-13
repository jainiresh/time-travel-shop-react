import { useEffect, useState } from 'react';
import styles from '../../styles/OldProducts.module.css';
import { useDispatch, useSelector } from 'react-redux';


export default function VintagePage() {

  const musicMetadataReducer = useSelector(state => state.musicMetadataReducer)
  console.log()


  return (
    <div className={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
        rel="stylesheet"
      />
      <header className={styles.header} style={{ display: 'flex' }}>
        <h1 style={{ width: '95%' }}>Derby's Music shop</h1>
        <div>Time : 03/02/1883</div>
      </header>
      <main className={styles.main}>
        {musicMetadataReducer.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <h2><span >{product.title}</span></h2>
            <img src={product.imageUrl ?? '/noImage.png'} className={styles.imageTint} />
            <div><span>by</span><br /><span style={{fontSize:'2rem'}}>  {product.artistDetails.name}</span></div>
          </div>
        ))}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Old Style Store</p>
      </footer>
    </div>
  );
}
