// gallery-sub.js
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import screenfull from 'screenfull';
import api from '../services/api';
import './gallery-sub.css';

const GallSub = () => {
  const [mediaList, setMediaList] = useState([]);
  const [fullScreenMedia, setFullScreenMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
    document.addEventListener('keydown', handleEscKey, false);
    return () => {
      document.removeEventListener('keydown', handleEscKey, false);
    };
  }, []);

  const fetchMedia = () => {
    api.gallery.getAll()
      .then((data) => {
        console.log('Media fetched:', data);
        setMediaList(data);
      })
      .catch((error) => console.error('Error fetching media:', error));
  };

  const handleFullScreen = (media) => {
    if (screenfull.isEnabled) {
      screenfull.request();
      setFullScreenMedia(media);
    } else {
      console.log('Full screen mode is not supported by this browser');
    }
  };

  const handleCloseFullScreen = () => {
    screenfull.exit();
    setFullScreenMedia(null);
  };

  const handleEscKey = (event) => {
    if (event.key === 'Escape') {
      screenfull.exit();
      setFullScreenMedia(null);
    }
  };

  return (
    <div className="gall-sub-main-container">
      <div className="events-heading-container">
        <p className="events-subheading">
          Discover our captivating <span className="spanns">photo gallery</span> and{' '}
          <span className="spanns">engaging videos</span> from various events
        </p>
      </div>
      {fullScreenMedia && (
        <div className="full-screen-overlay">
          <div className="full-screen-content">
            {fullScreenMedia.mediaType === 'image' && (
              <img src={fullScreenMedia.mediaUrl} alt="Full Screen" />
            )}
            {fullScreenMedia.mediaType === 'video' && (
              <video src={fullScreenMedia.mediaUrl} controls autoPlay />
            )}
            <button className="close-buttonnn" onClick={handleCloseFullScreen}>
              <FontAwesomeIcon icon={faCompress} />
            </button>
          </div>
        </div>
      )}
      <div className='media-grid-container'>
        <div className="media-grid">
          {mediaList.map((media, index) => (
            <div className="media-card" key={index}>
              <div className="media-container">
                {media.mediaType === 'image' && <img src={media.mediaUrl} alt={media.title} />}
                {media.mediaType === 'video' && <video src={media.mediaUrl} controls />}
                <div className="hover-overlay">
                  <FontAwesomeIcon
                    icon={faExpand}
                    onClick={() => handleFullScreen(media)}
                  />
                </div>
              </div>
              <div className="media-details">
                <h3>{media.title}</h3>
                <p>{new Date(media.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallSub;