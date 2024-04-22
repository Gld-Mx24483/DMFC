// events-user.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './events-user.css';

const EventsUser = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:9000/get-events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseSelectedEvent = () => {
    setSelectedEvent(null);
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
      {selectedEvent ? (
        <div className="selected-event-container">
          <div className="selected-event-image">
            <img src={selectedEvent.imagePath} alt={selectedEvent.title} />
          </div>
          <div className="selected-event-content">
            <h3>{selectedEvent.title}</h3>
            <p className="event-date">{selectedEvent.dateTime.split('T')[0]}</p>
            <p className="event-time">{selectedEvent.time}</p>
            <p className="event-location">{selectedEvent.location}</p>
            <p className="event-description">{selectedEvent.brief}</p>
            <p className="event-description">{selectedEvent.description}</p>
            <button className="close-buttonn" onClick={handleCloseSelectedEvent}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="event-cards-container">
          {events.map((event, index) => (
            <div key={index} className="event-card" onClick={() => handleEventClick(event)}>
              {event.imagePath && (
                <img src={event.imagePath} alt={event.title} className="event-card-image" />
              )}
              <div className="event-card-content">
                <h3>{event.title}</h3>
                <p className="event-date">{event.dateTime.split('T')[0]}</p>
                <p className="event-time">{event.time}</p>
                <p className="event-location">{event.location}</p>
                <p className="event-brief">{event.brief}</p>
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
};

export default EventsUser;