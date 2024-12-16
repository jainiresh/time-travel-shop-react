import React, { useEffect, useState } from "react";
import styles from "../../styles/ModernProducts.module.css";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import { youtubeSearchApi } from "../../api/youtubeSearchApi";
import ChangeCircle from "@mui/icons-material/ChangeCircle";
import IframePlayer from "./IframePlayer/IframePlayer";
import ModernLoader from "../Loaders/Modern/ModernLoader";
import RefreshIcon from "@mui/icons-material/Refresh";


export default function ModernPage() {
  const ModernProducts = useSelector((state) => state.musicMetadataReducer);
  const devCycleReducer = useSelector((state) => state.devCycleReducer);
  const loaderStateReducer = useSelector((state) => state.loaderStateReducer);

  const [style, setStyle] = useState(true);
  const [rotatingIndex, setRotatingIndex] = useState(null); // Track the rotating image
  const [isLoading, setIsLoading] = useState(true); // For loader fade-out
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProducts = ModernProducts.length;
  const [youtubeVideoDetails, setYoutubeVideoDetails] = useState(null);

  const slidesHere = ModernProducts.map((product) => ({
    title: product.title,
    subtitle: product.artistDetails.name,
    description: "Get ready for an immense music experience!",
    image: product.imageUrl,
  }));

  useEffect(()=>{

  console.log('The devcycle values modern is ');
  console.log(devCycleReducer.year);
  }, [devCycleReducer.year])
  useEffect(() => {
    if (!loaderStateReducer.showLoader) {
      const timer = setTimeout(() => setIsLoading(false), 800); // Delay for fade-out
      return () => clearTimeout(timer);
    }
  }, [loaderStateReducer.showLoader]);

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
    const prevIndexPre = (currentIndex - 2 + totalProducts) % totalProducts;
    const nextIndexNext = (currentIndex + 2) % totalProducts;
    const prevIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    const nextIndex = (currentIndex + 1) % totalProducts;
    return [prevIndexPre, prevIndex, currentIndex, nextIndex, nextIndexNext].map(
      (index) => ModernProducts[index]
    );
  };

  const visibleProducts = getVisibleProducts();

  const currentTime = new Date();
  currentTime.setFullYear(devCycleReducer.year);

  const changeStyle = () => {
    setStyle(style ? 0 : 1);
    console.log(style);
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <ModernLoader hidden={!isLoading} />
      {!isLoading && (style ? (
        <div className={styles.container}>
          <div className={styles.refresh}>
              <div onClick={refresh} className={styles.refreshButton}>
                <RefreshIcon />
              </div>
              <span>Fetch new set of songs</span>
            </div>
          <header className={styles.header}>
            <h1>The Modern (2010s - Present) Music Store</h1>
            <span style={{ fontSize: "1.4rem", color:'yellowgreen' }}>
              Current Year : {devCycleReducer.year}
            </span>
            <h3 className={styles.name} onClick={changeStyle}>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "0.4rem",
                }}
              >
                <ChangeCircle /> <span>Change Carousel</span>
              </div>
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
          <div className={styles.refresh}>
              <div onClick={refresh} className={styles.refreshButton}>
                <RefreshIcon />
              </div>
              <span>Fetch new set of songs</span>
            </div>  
          <header className={styles.header}>
            <h1>The Modern (2010s - Present) Music Store</h1>
            <span style={{ fontSize: "1.4rem", color:'yellowgreen' }}>
              Current Year : {devCycleReducer.year}
            </span>
            <h3 className={styles.name} onClick={changeStyle}>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  gap: "0.4rem",
                }}
              >
                <ChangeCircle /> <span>Change Carousel</span>
              </div>
            </h3>
          </header>
          <main className={styles.main}>
            <button className={styles.navButton} onClick={handlePrev}>
              ‹
            </button>
            <div className={styles.carousel}>
              {visibleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`${styles.productCard} ${
                    index === 2 ? styles.centerCard : ""
                  }`}
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
                    <div
                      style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
                    >
                      <button
                        className={styles.playButton}
                        onClick={() => handlePlayClick(product, index)}
                      ></button>
                      <h3 style={{ paddingTop: "0.4rem" }}>Listen now </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.navButton} onClick={handleNext}>
              ›
            </button>
            {youtubeVideoDetails && (
              <IframePlayer
                youtubeVideoDetails={youtubeVideoDetails}
                handleIframeClose={() => handleIframeClose()}
              />
            )}
          </main>
          <footer className={styles.footer}>
            <p>© 2024 Modern Products Store</p>
          </footer>
        </div>
      ))}
    </>
  );
}
