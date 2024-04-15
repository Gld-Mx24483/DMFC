// event-management.js
import React, { useState, useEffect } from 'react';
import './event-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FileUpload from './fileupload';

const EventMan = () => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    picture: null,
    title: '',
    dateTime: new Date(),
    location: '',
    description: '',
    brief: ''
  });
  const [events, setEvents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'time') {
      const selectedTime = value;
      const selectedDateTime = new Date(eventDetails.dateTime);
      const [hours, minutes] = selectedTime.split(':');
      selectedDateTime.setHours(hours);
      selectedDateTime.setMinutes(minutes);
      setEventDetails(prevState => ({
        ...prevState,
        dateTime: selectedDateTime
      }));
    } else {
      setEventDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      setImageFile(file);
      setEventDetails(prevState => ({
        ...prevState,
        picture: URL.createObjectURL(file)
      }));
    } else {
      setImageFile(null);
      setEventDetails(prevState => ({
        ...prevState,
        picture: null
      }));
    }
  };

  const handleSaveEvent = () => {
    const formData = new FormData();
    formData.append('id', editIndex !== null ? events[editIndex].id : null);
    formData.append('title', eventDetails.title);
    formData.append('dateTime', eventDetails.dateTime.toISOString().split('T')[0]);
    formData.append('location', eventDetails.location);
    formData.append('description', eventDetails.description);
    formData.append('brief', eventDetails.brief);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const url = editIndex !== null ? 'http://localhost:9000/update-event' : 'http://localhost:9000/save-event';
    const method = editIndex !== null ? 'POST' : 'PUT';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Event saved successfully:', data);
        setEventDetails({
          picture: data.imagePath ? `http://localhost:9000/uploads/${data.imagePath}` : '',
          title: '',
          dateTime: new Date(),
          location: '',
          description: '',
          brief: ''
        });
        setIsAddingEvent(false);
        setEditIndex(null);
        setImageFile(null);
        alert("Event successfully added!");
        fetchEvents(); // Fetch updated events data
      })
      .catch((error) => {
        console.error('Error saving event:', error);
        alert('Error saving event!');
      });
  };

  const handleEditEvent = (index) => {
    setEditIndex(index);
    const eventToEdit = events[index];
    setEventDetails(eventToEdit);
    setIsAddingEvent(true);
  };

  const fetchEvents = () => {
    fetch('http://localhost:9000/get-events')
      .then((response) => response.json())
      .then((data) => {
        console.log('Events fetched:', data);
        setEvents(data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="event-management-main-container">
      {!isAddingEvent ? (
        <button className="add-event-button" onClick={() => setIsAddingEvent(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add Event
        </button>
      ) : (
        <button className="add-event-button can" onClick={() => setIsAddingEvent(false)}>
          <FontAwesomeIcon icon={faCalendarTimes} />
          Cancel
        </button>
      )}
      {isAddingEvent && (
        <div className="event-section">
          <h2>{editIndex !== null ? 'Edit Event' : 'Add New Event'}</h2>
          <div className="event-form">
            <FileUpload onFileUpload={handleImageUpload} className="fileupload" text="Drag and drop an image or click to select an image" />
            {eventDetails.picture && <img src={eventDetails.picture} alt="Event" className="event-picture" />}
            <input type="text" name="title" placeholder="Event Title" value={eventDetails.title} onChange={handleInputChange} />
            <div className="date-time-picker event-dt">
              <Calendar
                onChange={(date) => setEventDetails({ ...eventDetails, dateTime: date })}
                value={eventDetails.dateTime}
              />
              <input className='timees' type="time" name="time" value={eventDetails.dateTime.toTimeString().substring(0, 5)} onChange={handleInputChange} />
            </div>
            <input type="text" name="location" placeholder="Location" value={eventDetails.location} onChange={handleInputChange} />
            <textarea name="description" placeholder="Full Description" value={eventDetails.description} onChange={handleInputChange} />
            <textarea name="brief" placeholder="Short Brief" value={eventDetails.brief} onChange={handleInputChange} />
            <button className="save-event-button" onClick={handleSaveEvent}>{editIndex !== null ? 'Update Event' : 'Save Event'}</button>
          </div>
        </div>
      )}
      <div className="event-list">
        {events.length === 0 ? (
          <div className="no-events-message">
            <p>No event at the moment</p>
            <FontAwesomeIcon icon={faCalendarTimes} className="no-events-icon" />
          </div>
        ) : (
          events.map((event, index) => (
            <div className="event-item" key={index}>
              <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={() => handleEditEvent(index)} />
              {/* <img src={event.picture} alt="Event" className="event-picture" /> */}
              {event.imagePath && <img className="event-picture" src={event.imagePath} alt="Event" />}
              <div className="event-details">
                <p>{event.title}</p>
                <p>{event.dateTime.toLocaleString()}</p>
                <p>{event.location}</p>
                <p>{event.brief}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventMan;