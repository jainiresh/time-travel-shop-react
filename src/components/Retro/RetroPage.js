import React, { useEffect, useState } from "react";
import styles from "../../styles/RetroProducts.module.css";
import { useSelector } from "react-redux";
import { youtubeSearchApi } from "../../api/youtubeSearchApi";
import RetroLoader from "../Loaders/Retro/RetroLoader";
import VintageLoader from "../Loaders/Vintage/VintageLoader";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function RetroPage() {
  const ModernProducts = useSelector((state) => state.musicMetadataReducer);
  const devCycleReducer = useSelector((state) => state.devCycleReducer);
  const currentTime = new Date();
  currentTime.setFullYear(devCycleReducer.year);

  const [youtubeVideoDetails, setYoutubeVideoDetails] = useState(null);

  const handlePlayClick = async (product) => {
    const videoDetails = await youtubeSearchApi(product.title + " " + product.artistDetails.name);
    setYoutubeVideoDetails(videoDetails.items[0]);
  };
  const loaderStateReducer = useSelector(state => state.loaderStateReducer)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!loaderStateReducer.showLoader){
      setTimeout(setLoading(false), 800)
    }
  }, [loaderStateReducer.showLoader])
  

  function handleIframeClose(){
    setYoutubeVideoDetails(null)
  }
  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
    <VintageLoader hidden={!loading}/>
    {!loading &&
    <div className={styles.container}>
      <div className={styles.refresh}>
              <div onClick={refresh} className={styles.refreshButton}>
                <RefreshIcon />
              </div>
              <span>Fetch new set of songs</span>
            </div>
      <div className={styles.marquee}>
        <span>Feel the Retro Vibes of Music 🎶 | Timeless Classics | A Journey Back in Time...</span>
      </div>
      <header className={styles.header}>
        <h1>Retro (1990s - 2010s) Music Store</h1>
        <span>CurrentYear : {devCycleReducer.year}</span>
      </header>
      <div className={styles.marquee}>
        <span>Retro Era Music Lives Here! | Discover the Soundtracks of the Past 🚀</span>
      </div>
      <main className={styles.main}>
        {ModernProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.imageUrl ?? "/noImage.png"}
              className={styles.imageTint}
              alt={product.title}
            />
            <div className={styles.productDetails}>
              <h2>{product.title}</h2>
              <span>{product.artistDetails["name"]}</span>
            </div>
            <button
              className={styles.playButton}
              onClick={() => handlePlayClick(product)}
            >
              Play this song
            </button>
          </div>
        ))}
      </main>

      {youtubeVideoDetails && (
        <div className={styles.youtubePlayer}>
          <div className={styles.playerTitle}><span >Now playing :</span> <span style={{cursor:'pointer'}} onClick={() => handleIframeClose()}>close</span></div>
          <iframe
            className={styles.youtubeIframe}
            src={`https://www.youtube.com/embed/${youtubeVideoDetails.id.videoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className={styles.marquee}>
        <span>© 2024 Retro Music Store | Bringing Nostalgia to Life | Thanks for Visiting!</span>
      </div>
    </div>}
    </>
  );
}
