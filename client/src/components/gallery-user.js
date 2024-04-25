// Gal.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import screenfull from 'screenfull';
import './gallery-user.css';

const Gal = () => {
  const [mediaList, setMediaList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    let slideInterval;

    if (!isVideoPlaying) {
      slideInterval = setInterval(() => {
        if (!isSliding) {
          handleNext();
        }
      }, 5000);
    }

    return () => clearInterval(slideInterval);
  }, [isSliding, isVideoPlaying]);

  useEffect(() => {
    if (mediaList.length > 0 && mediaList[currentIndex] && mediaList[currentIndex].videoPath) {
      const videoElement = videoRef.current;
      videoElement.load();
    }
  }, [currentIndex, mediaList]);

  const fetchMedia = () => {
    fetch('https://dmfc-server-sql.vercel.app/get-media')
      .then((response) => response.json())
      .then((data) => {
        console.log('Media fetched:', data);
        setMediaList(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error fetching media:', error));
  };

  const handlePrevious = () => {
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaList.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex === mediaList.length - 1 ? 0 : prevIndex + 1));
  };

  const handleVideoPlaying = (playing) => {
    setIsVideoPlaying(playing);
  };

  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      const slideElement = document.querySelector('.slide');
  
      if (isFullscreen) {
        screenfull.exit();
        slideElement.classList.remove('full-screen');
        setIsFullscreen(false);
      } else {
        screenfull.request(slideElement);
        slideElement.classList.add('full-screen');
        setIsFullscreen(true);
      }
    }
  };

  return (
    <div className="gal-main-container">
      <div className="gallery-header">
        <h1>GALLERY</h1>
        <p className="gallery-caption">Explore the captivating world of visual wonder</p>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="gal-content">
          <div className="slideshow">
            <div className={`slide ${isSliding ? 'slide-animation' : ''}`} onAnimationEnd={() => setIsSliding(false)}>
              {mediaList[currentIndex]?.imagePath && <img src={mediaList[currentIndex].imagePath} alt="Media" />}
              {mediaList[currentIndex]?.videoPath && (
                <video
                  ref={videoRef}
                  controls
                  onPlaying={() => handleVideoPlaying(true)}
                  onPause={() => handleVideoPlaying(false)}
                  onEnded={() => handleVideoPlaying(false)}
                >
                  <source src={mediaList[currentIndex].videoPath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
          <div className="controls">
            <button className="control-button prev" onClick={handlePrevious}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="control-button next" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button> 
          </div>
          <button className="fullscreen" onClick={handleFullscreen}>
    <FontAwesomeIcon icon={isFullscreen? faCompress : faExpand} />
  </button>
  <div className="slide-info">
  {mediaList.length > 0 && (
    <span>
      {currentIndex + 1}/{mediaList.length}
    </span>
  )}
</div>
        </div>
      )}
    </div>
  );
};

export default Gal;