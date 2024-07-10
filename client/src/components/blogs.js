// Blogs.js
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './blogs.css';

const Blog = () => {
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.blogs.getAll();
        setContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const handleCloseSelectedContent = () => {
    setSelectedContent(null);
  };

  return (
    <div className="events-user-main-container">
      <div className="events-heading-container">
        <h2 className="events-heading">Latest Blogs</h2>
        <p className="events-subheading">
          Explore our <span className="spanns">newest</span> blog posts{' '} <span className="spanns">today!!!</span>
        </p>
      </div>
      {selectedContent ? (
        <div className="selected-event-container">
          <div className="selected-event-image">
            {selectedContent.imagePath && (
              <img src={selectedContent.imagePath} alt={selectedContent.title} />
            )}
            {selectedContent.videoUrl && (
              <video className="event-card-image" controls src={selectedContent.videoUrl}></video>
            )}
          </div>
          <div className="selected-event-content contentss">
            <h2>{selectedContent.title}</h2>
            <p>{selectedContent.dateTime} - {selectedContent.uploadTime}</p>
            <p>{selectedContent.fullName}</p>
            <div dangerouslySetInnerHTML={{ __html: selectedContent.body }}></div>
            <button className="close-buttonn " onClick={handleCloseSelectedContent}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="event-cards-container">
          {content.map((item) => (
            <div key={item.id} className="event-card" onClick={() => handleContentClick(item)}>
              {item.imagePath && (<img src={item.imagePath} alt={item.title} className="event-card-image" />)}
              {item.videoUrl && <video className="event-card-image" controls src={item.videoUrl}></video>}
              <div className="event-card-content">
                <h3>{item.title}</h3>
                <p className="event-time">{item.dateTime} - {item.uploadTime}</p>
                <p className="event-location">{item.fullName}</p>
              </div>
              <div className="chevron-icon-container">
                <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;