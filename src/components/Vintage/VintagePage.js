import { useEffect, useState } from 'react';
import styles from '../../styles/OldProducts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { youtubeSearchApi } from "../../api/youtubeSearchApi";


export default function VintagePage() {

  const musicMetadataReducer = useSelector(state => state.musicMetadataReducer)
  console.log()
const [youtubeVideoDetails, setYoutubeVideoDetails] = useState(null);

  // Function to handle opening the YouTube link
  const handlePlayClick = async (product) => {
    const videoDetails = await youtubeSearchApi(product.title + " " + product.artistDetails.name);
    setYoutubeVideoDetails(videoDetails.items[0]);
  };

  function handleIframeClose(){
    setYoutubeVideoDetails(null)
  }

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
      <footer className={styles.footer}>
        <p>© 2024 Old Style Store</p>
      </footer>
    </div>
  );
}
