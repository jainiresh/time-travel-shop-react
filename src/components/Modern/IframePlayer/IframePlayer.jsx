import React from 'react'
import './index.css'

const IframePlayer = ({handleIframeClose, youtubeVideoDetails}) => {
  return (
    <div 
              className="youtubePlayer" 
            >
              <div className="playerTitle">
                <span>Listening to:</span>
                <span style={{ cursor: 'pointer' }} onClick={() => handleIframeClose()}>close</span>
              </div>
              <div className="videoWrapper">
                <iframe
                  className="youtubeIframe"
                  src={`https://www.youtube.com/embed/${youtubeVideoDetails.id.videoId}?autoplay=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
                <div className="rotatingDisk"></div>
              </div>
            </div>
  )
}

export default IframePlayer