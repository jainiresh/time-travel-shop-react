import React, { useEffect, useState } from "react";
import styles from "../../styles/ModernProducts.module.css";
import { useSelector } from "react-redux";

export default function ModernPage() {
  const ModernProducts = useSelector((state) => state.musicMetadataReducer);
  const [environment, setEnvironment] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // To track the clicked product
  const [isPlaying, setIsPlaying] = useState(false); // To toggle play state
  console.log(ModernProducts);
  
  useEffect(() => {
    setEnvironment(process.env.REACT_APP_OLD_PRODUCTS || "default");
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product); // Set the selected product for the modal
    setIsPlaying(true); // Start the song playing animation
  };

  const closeModal = () => {
    setSelectedProduct(null); // Close the modal
    setIsPlaying(false); // Stop the song playing animation
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Explore Modern Products</h1>
      </header>
      <main className={styles.main}>
        {ModernProducts.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleCardClick(product)} // Handle click event
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

      {selectedProduct && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <div className={styles.modalImageWrapper}>
              <img
                src={selectedProduct.imageUrl ?? "/noImage.png"}
                alt={selectedProduct.title}
                className={styles.rotatingImage} // Rotating circular image
              />
              {isPlaying && (
                <div className={styles.playingDots}>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              )}
            </div>

            <div className={styles.modalDetails}>
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.artistDetails["name"]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
