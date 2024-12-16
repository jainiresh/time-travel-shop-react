import React, { useEffect, useState } from "react";
import styles from "../../styles/ModernProducts.module.css";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import { youtubeSearchApi } from "../../api/youtubeSearchApi";

export default function ModernPage() {
  const ModernProducts = useSelector((state) => state.musicMetadataReducer);
  const devCycleReducer = useSelector((state) => state.devCycleReducer);
  const [style, setStyle] = useState(true);
  const [rotatingIndex, setRotatingIndex] = useState(null); // Track the rotating image

  const slidesHere = ModernProducts.map((product) => ({
    title: product.title,
    subtitle: product.artistDetails.name,
    description: "Get ready for an immense music experience!",
    image: product.imageUrl,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProducts = ModernProducts.length;
  const [youtubeVideoDetails, setYoutubeVideoDetails] = useState(null);

  const handlePlayClick = async (product, index) => {
    const videoDetails = await youtubeSearchApi(product.title + " " + product.artistDetails.name);
    setYoutubeVideoDetails(videoDetails.items[0]);
    setRotatingIndex(index); // Start rotating the image
  };

  const handleIframeClose = () => {
    setYoutubeVideoDetails(null);
    setRotatingIndex(null); // Stop rotation
  };

  useEffect(() => {
    if (ModernProducts.length === 0) {
      console.error("No products available!");
    }
  }, [ModernProducts]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProducts);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProducts) % totalProducts);
  };

  const getVisibleProducts = () => {
    const prevIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    const nextIndex = (currentIndex + 1) % totalProducts;
    return [prevIndex, currentIndex, nextIndex].map((index) => ModernProducts[index]);
  };

  const visibleProducts = getVisibleProducts();

  const currentTime = new Date();
  currentTime.setFullYear(devCycleReducer.year);

  const changeStyle = () => {
    setStyle(style ? 0 : 1);
    console.log(style);
  };

  return style ? (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>The Modern Music Store</h1>
        <span style={{ fontSize: "1.4rem" }}>
          Time : {currentTime.toLocaleTimeString()} - {currentTime.toDateString()}
        </span>
        <h3 className={styles.name} onClick={changeStyle}>
            <br></br>Change Style
        </h3>
      </header>
      <main className={styles.main}>
        <Carousel slides={slidesHere} />
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Modern Products Store</p>
      </footer>
    </div>
  ) : (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Explore Modern Products</h1>
        <span className={styles.name} onClick={changeStyle}>
          Change Style
        </span>
      </header>

      <main className={styles.main}>
        <button className={styles.navButton} onClick={handlePrev}>
          ‹
        </button>
        <div className={styles.carousel}>
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className={`${styles.productCard} ${index === 1 ? styles.centerCard : ""}`}
            >
              <img
                src={product.imageUrl ?? "/noImage.png"}
                className={`${styles.productImage} ${
                  index === rotatingIndex ? styles.rotatingImage : ""
                }`}
                alt={product.title}
              />
              <div className={styles.productDetails}>
                <h2>{product.title}</h2>
                <p>{product.artistDetails["name"]}</p>
                <button
                  className={styles.playButton}
                  onClick={() => handlePlayClick(product, index)}
                >
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.navButton} onClick={handleNext}>
          ›
        </button>
        {youtubeVideoDetails && (
          <div className={styles.youtubePlayer}>
            <div className={styles.playerTitle}>
              <span>Now playing:</span>{" "}
              <span style={{ cursor: "pointer" }} onClick={() => handleIframeClose()}>
                close
              </span>
            </div>
            <iframe
              className={styles.youtubeIframe}
              src={`https://www.youtube.com/embed/${youtubeVideoDetails.id.videoId}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Modern Products Store</p>
      </footer>
    </div>
  );
}
