// gallery-sub.js
import React, { useState, useEffect } from 'react';
import './gallery-sub.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';

const GallSub = () => {
  const [mediaList, setMediaList] = useState([]);
  const [fullScreenMedia, setFullScreenMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    fetch('http://localhost:9000/get-media')
      .then((response) => response.json())
      .then((data) => {
        console.log('Media fetched:', data);
        setMediaList(data);
      })
      .catch((error) => console.error('Error fetching media:', error));
  };

  const handleFullScreen = (media) => {
    setFullScreenMedia(media);
  };

  const handleCloseFullScreen = () => {
    setFullScreenMedia(null);
  };

  return (
    <div className="gall-sub-main-container">
        <div className="events-heading-container">
    <p className="events-subheading">
    Discover our captivating <span className="spanns">photo gallery</span> and{' '}
    <span className="spanns">engaging videos</span> from various events
    </p>
      </div>
      {fullScreenMedia ? (
        <div className="full-screen-overlay">
          <div className="full-screen-content">
            {fullScreenMedia.imagePath && (
              <img src={fullScreenMedia.imagePath} alt="Full Screen" />
            )}
            {fullScreenMedia.videoPath && (
              <video src={fullScreenMedia.videoPath} controls autoPlay />
            )}
            <button className="close-button" onClick={handleCloseFullScreen}>
              <FontAwesomeIcon icon={faCompress} />
            </button>
          </div>
        </div>
      ) : null}
      <div className='media-grid-container'>
      <div className="media-grid">
        {mediaList.map((media, index) => (
          <div className="media-card" key={index}>
            <div className="media-container">
              {media.imagePath && <img src={media.imagePath} alt="Media" />}
              {media.videoPath && <video src={media.videoPath} controls />}
              <div className="hover-overlay">
                <FontAwesomeIcon
                  icon={faExpand}
                  onClick={() => handleFullScreen(media)}
                />
              </div>
            </div>
            <div className="media-details">
              <h3>{media.title}</h3>
              <p>{new Date(media.upload_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default GallSub;