import React, { useEffect, useState } from "react";
import styles from "../../styles/RetroProducts.module.css";
import { useSelector } from "react-redux";

export default function RetroPage() {
  const ModernProducts = useSelector((state) => state.musicMetadataReducer);
  const [environment, setEnvironment] = useState(null);
  console.log(ModernProducts);
  
  useEffect(() => {
    setEnvironment(process.env.REACT_APP_OLD_PRODUCTS || "default");
  }, []);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Retro Modern Products</h1>
      </header>
      <main className={styles.main}>
        {ModernProducts.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            // Handle click event
          >
            <img
              src={product.imageUrl ?? "/noImage.png"}
              className={styles.imageTint}
              alt={product.title}
            />
            <div className={styles.productDetails}>
              <h2>{product.title}</h2>
              <span>{product.artistDetails["name"]}</span>
            </div>
          </div>
        ))}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Modern Products Store</p>
      </footer>

      
    </div>
  );
}
