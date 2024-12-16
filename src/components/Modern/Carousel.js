import React, { useState } from 'react';
import styles from './Carousel.css'; // Make sure to copy the styles into Carousel.css
import { youtubeSearchApi } from "../../api/youtubeSearchApi";
import IframePlayer from './IframePlayer/IframePlayer';
function Carousel({slides}) {
  const initialState = {
    slideIndex: 0,
  };
   const [youtubeVideoDetails, setYoutubeVideoDetails] = useState(null);
  
    // Function to handle opening the YouTube link
    const handlePlayClick = async (product) => {
      
      const videoDetails = await youtubeSearchApi(product.title + " " + product.subtitle);
      setYoutubeVideoDetails(videoDetails.items[0]);
    };
  
    function handleIframeClose(){
      setYoutubeVideoDetails(null)
    }


  const slidesReducer = (state, event) => {
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length,
      };
    }
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
      };
    }
  };

  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  function useTilt(active) {
    const ref = React.useRef(null);

    React.useEffect(() => {
      if (!ref.current || !active) {
        return;
      }

      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined,
      };

      let el = ref.current;

      const handleMouseMove = (e) => {
        if (!el) {
          return;
        }
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        const px = (state.mouseX - state.rect.left) / state.rect.width;
        const py = (state.mouseY - state.rect.top) / state.rect.height;

        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };

      el.addEventListener("mousemove", handleMouseMove);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
      };
    }, [active]);

    return ref;
  }

  function Slide({ slide, offset }) {
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);


    return (
      (<div
        ref={ref}
        className="slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
        }}
      >
        {/* <div
          className="slideBackground"
          style={{
            backgroundImage: `url('${slide.image}')`,
          }}
        /> */}
        <div
          className="slideContent"
          style={{
            backgroundImage: `url('${slide.image ?? './noImage.png'}')`,
          }}
        >
          <div className="slideContentInner">
            <h2 className="slideTitle">{slide.title}</h2>
            <h3 className="slideSubtitle">{slide.subtitle}</h3>
            <p className="slideDescription">{slide.description}</p>
            <div style={{display:'flex', alignItems:'center', gap:'1rem', paddingTop:'1rem', transformStyle:'unset', cursor:'pointer'}} onClick={() => handlePlayClick(slide)}>
            <button
                          className="playButton"
                        >
                        </button>
                        <span style={{fontSize:'2rem', fontWeight:'bolder'}}>Listen Now</span>
                        </div>
          </div>
        </div>
      </div>)
    );
  }

  return (
    <div className="slides">
      <button onClick={() => dispatch({ type: "PREV" })}>‹</button>

      {[...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })}

      <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
      {youtubeVideoDetails && (
                        <IframePlayer handleIframeClose={() => handleIframeClose()} youtubeVideoDetails={youtubeVideoDetails} />
            )}
    </div>
  );
}

export default Carousel;
