// Blogs.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Blog = () => {
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:9000/get-content');
        const data = await response.json();
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
        <h2 className="events-heading">Upcoming Events</h2>
        <p className="events-subheading">
          Discover the latest <span className="spanns">events</span> happening{' '}
          <span className="spanns">soon!!!</span>
        </p>
      </div>
      {selectedContent ? (
        <div className="selected-event-container">
            <div className="selected-event-image">
            <img src={selectedContent.imagePath} alt={selectedContent.title} />
          </div>
          <div className='selected-event-content'>
          <h2>{selectedContent.title}</h2>
          <p>{selectedContent.dateTime} - {selectedContent.uploadTime}</p>
          <p>{selectedContent.fullName}</p>
          <div dangerouslySetInnerHTML={{ __html: selectedContent.body }}></div>
          <button className="close-button" onClick={handleCloseSelectedContent}>
            Close
          </button>
          </div>
        </div>
      ) : (
        <div className="event-cards-container">
          {content.map((item, index) => (
            <div key={index} className="event-card" onClick={() => handleContentClick(item)}>
              {item.imagePath && (
                <img src={item.imagePath} alt={item.title} className="event-card-image" />
              )}
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
