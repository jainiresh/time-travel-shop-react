import React, { useEffect, useState } from "react";
import styles from "../../styles/ModernProducts.module.css";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";

export default function ModernPage() {
  const ModernProducts = useSelector((state) => state.musicMetadataReducer);
  const devCycleReducer = useSelector((state) => state.devCycleReducer)
  const slidesHere = ModernProducts.map(product => ({
    title: product.title,
    subtitle: product.artistDetails.name,
    description: 'Get ready for an immense music experience !',
    image: product.imageUrl
  }))

  const currentTime = new Date();
  currentTime.setFullYear(devCycleReducer.year);

  // const [slides, setSlides] = useState(slidesHere)
  console.log(ModernProducts);
  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>The Modern Music Store</h1>
        <span style={{fontSize:'1.4rem'}}>Time : {currentTime.toLocaleTimeString()} - {currentTime.toDateString()}</span>
      </header>
      <main className={styles.main}>
        {/* {ModernProducts.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
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
        ))} */}
        <Carousel slides={slidesHere}/>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Modern Products Store</p>
      </footer>

     
    </div>
  );
}
