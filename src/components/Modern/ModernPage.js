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
  }, [devCycleReducer.year])
  useEffect(() => {
    if (!loaderStateReducer.showLoader) {
      const timer = setTimeout(() => setIsLoading(false), 800); 
      return () => clearTimeout(timer);
    }
  }, [loaderStateReducer.showLoader]);

  const handlePlayClick = async (product, index) => {
    if(index != 2)
      return;
    const videoDetails = await youtubeSearchApi(product.title + " " + product.artistDetails.name+ " song");
    setYoutubeVideoDetails(videoDetails.items[0]);
    setRotatingIndex(index); 
  };

  const handleIframeClose = () => {
    setYoutubeVideoDetails(null);
    setRotatingIndex(null); 
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
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <ModernLoader hidden={!isLoading} />
      {!isLoading && (style ? (
        <div style={{background:'linear-gradient(to bottom, #141e30, #243b55)'}}>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Pixelify+Sans:wght@400..700&family=Playwrite+IT+Moderna:wght@100..400&display=swap" rel="stylesheet" />
        <div className={styles.container}>
        <header
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15rem',
    padding: '0 40px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 1,
    borderRadius: '10px',
  }}
>
  <h1
    style={{
      fontFamily: "ROBOTO",
      fontSize: '3rem',
      color: '#ffffff',
      letterSpacing: '2px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
  >
    THE MODERN MUSIC STORE 
    <span style={{fontSize:'1.4rem', paddingLeft: '1rem'}}> (2010's - Present)</span>
  </h1>

  <span
    style={{
      fontFamily: 'Roboto, sans-serif',
      fontSize: '2rem',
      color: '',
      fontStyle:'italic',
      fontWeight: 500,
      transition: 'color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.color = '#56ccf2')}
    onMouseLeave={(e) => (e.target.style.color = 'yellowgreen')}
  >
    Current Year : {devCycleReducer.year}
  </span>
</header>

          <div className={styles.refresh} onClick={refresh}>
              <div  className={styles.refreshButton}>
                <RefreshIcon />
              </div>
              <span >Fetch new set of songs</span>
            </div>
          <main className={styles.main}>
            <Carousel slides={slidesHere} year={devCycleReducer.year} />
          </main>
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
        </div>
        <div style={{width:'100vw', display:'flex', justifyContent:'center'}}>
        <footer className={styles.footer}>
        <p>© 2024 Modern Products Store</p>
      </footer>
      </div>
        </div>
      ) : (
        <div className={styles.container}>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Pixelify+Sans:wght@400..700&family=Playwrite+IT+Moderna:wght@100..400&display=swap" rel="stylesheet" />
          <div onClick={refresh} className={styles.refresh}>
              <div  className={styles.refreshButton}>
                <RefreshIcon />
              </div>
              <span>Fetch new set of songs</span>
            </div>  
            <header
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15rem',
    padding: '0 40px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 1,
    borderRadius: '10px',
  }}
>
  <h1
    style={{
      fontFamily: "ROBOTO",
      fontSize: '3rem',
      color: '#ffffff',
      letterSpacing: '2px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
  >
    THE MODERN MUSIC STORE 
    <span style={{fontSize:'1.4rem', paddingLeft: '1rem'}}> (2010's - Present)</span>
  </h1>

  <span
    style={{
      fontFamily: 'Roboto, sans-serif',
      fontSize: '2rem',
      color: 'white',
      fontStyle:'italic',
      fontWeight: 500,
      transition: 'color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.color = '#56ccf2')}
    onMouseLeave={(e) => (e.target.style.color = 'yellowgreen')}
  >
    Current Year : {devCycleReducer.year}
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
        </div>
        
      ))}
    </>
  );
}
