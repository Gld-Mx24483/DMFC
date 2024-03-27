// // event-management.js
// import React, { useState } from 'react';
// import './event-management.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen, faPlus, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';

// const EventMan = () => {
//   const [isAddingEvent, setIsAddingEvent] = useState(false);
//   const [eventDetails, setEventDetails] = useState({
//     picture: null,
//     title: '',
//     dateTime: '',
//     description: '',
//     brief: ''
//   });
//   const [events, setEvents] = useState([]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEventDetails(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (event) => {
//     const imageFile = event.target.files[0];
//     setEventDetails(prevState => ({
//       ...prevState,
//       picture: URL.createObjectURL(imageFile)
//     }));
//   };

//   const handleSaveEvent = () => {
//     // Handle saving the event details
//     setEvents(prevEvents => [...prevEvents, eventDetails]);
//     // Reset the form
//     setEventDetails({
//       picture: null,
//       title: '',
//       dateTime: '',
//       description: '',
//       brief: ''
//     });
//     // Hide the event section
//     setIsAddingEvent(false);
//     // Display alert and navigate to event section
//     alert("Event successfully added!");
//   };

//   return (
//     <div className="event-management-main-container">
//       {!isAddingEvent ? (
//         <button className="add-event-button" onClick={() => setIsAddingEvent(true)}>
//           <FontAwesomeIcon icon={faPlus} />
//           Add Event
//         </button>
//       ) : (
//         <div className="event-section">
//           <h2>Add New Event</h2>
//           <div className="event-form">
//             <input type="file" accept="image/*" name="picture" onChange={handleImageChange} />
//             {eventDetails.picture && <img src={eventDetails.picture} alt="Event" className="event-picture" />}
//             <input type="text" name="title" placeholder="Event Title" value={eventDetails.title} onChange={handleInputChange} />
//             <input type="text" name="dateTime" placeholder="Date and Time" value={eventDetails.dateTime} onChange={handleInputChange} />
//             <textarea name="description" placeholder="Full Description" value={eventDetails.description} onChange={handleInputChange} />
//             <textarea name="brief" placeholder="Short Brief" value={eventDetails.brief} onChange={handleInputChange} />
//             <button className="save-event-button" onClick={handleSaveEvent}>Save Event</button>
//           </div>
//         </div>
//       )}
//       <div className="event-list">
//         {events.length === 0 ? (
//           <div className="no-events-message">
//             <p>No event at the moment</p>
//             <FontAwesomeIcon icon={faCalendarTimes} className="no-events-icon" />
//           </div>
//         ) : (
//           events.map((event, index) => (
//             <div className="event-item" key={index}>
//               <FontAwesomeIcon icon={faPen} className="edit-icon" />
//               <img src={event.picture} alt="Event" className="event-picture" />
//               <div className="event-details">
//                 <p><strong>Title:</strong> {event.title}</p>
//                 <p><strong>Date and Time:</strong> {event.dateTime}</p>
//                 <p><strong>Brief:</strong> {event.brief}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default EventMan;


// import React, { useState } from 'react';
// import './event-management.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen, faPlus, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';

// const EventMan = () => {
//   const [isAddingEvent, setIsAddingEvent] = useState(false);
//   const [eventDetails, setEventDetails] = useState({
//     picture: null,
//     title: '',
//     dateTime: '',
//     description: '',
//     brief: ''
//   });
//   const [events, setEvents] = useState([]);
//   const [editIndex, setEditIndex] = useState(null); // New state for tracking the index of the event being edited

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEventDetails(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (event) => {
//     const imageFile = event.target.files[0];
//     setEventDetails(prevState => ({
//       ...prevState,
//       picture: URL.createObjectURL(imageFile)
//     }));
//   };

//   const handleSaveEvent = () => {
//     // Handle saving the event details
//     setEvents(prevEvents => [...prevEvents, eventDetails]);
//     // Reset the form
//     setEventDetails({
//       picture: null,
//       title: '',
//       dateTime: '',
//       description: '',
//       brief: ''
//     });
//     // Hide the event section
//     setIsAddingEvent(false);
//     // Display alert and navigate to event section
//     alert("Event successfully added!");
//   };

//   const handleEditEvent = (index) => {
//     // Set the edit index to the index of the event being edited
//     setEditIndex(index);
//     // Populate the input fields with the details of the event being edited
//     const eventToEdit = events[index];
//     setEventDetails({
//       picture: eventToEdit.picture,
//       title: eventToEdit.title,
//       dateTime: eventToEdit.dateTime,
//       description: eventToEdit.description,
//       brief: eventToEdit.brief
//     });
//     // Show the event section for editing
//     setIsAddingEvent(true);
//   };

//   return (
//     <div className="event-management-main-container">
//       {!isAddingEvent ? (
//         <button className="add-event-button" onClick={() => setIsAddingEvent(true)}>
//           <FontAwesomeIcon icon={faPlus} />
//           Add Event
//         </button>
//       ) : (
//         <div className="event-section">
//           <h2>{editIndex !== null ? 'Edit Event' : 'Add New Event'}</h2>
//           <div className="event-form">
//             <input type="file" accept="image/*" name="picture" onChange={handleImageChange} />
//             {eventDetails.picture && <img src={eventDetails.picture} alt="Event" className="event-picture" />}
//             <input type="text" name="title" placeholder="Event Title" value={eventDetails.title} onChange={handleInputChange} />
//             <input type="text" name="dateTime" placeholder="Date and Time" value={eventDetails.dateTime} onChange={handleInputChange} />
//             <textarea name="description" placeholder="Full Description" value={eventDetails.description} onChange={handleInputChange} />
//             <textarea name="brief" placeholder="Short Brief" value={eventDetails.brief} onChange={handleInputChange} />
//             <button className="save-event-button" onClick={handleSaveEvent}>{editIndex !== null ? 'Update Event' : 'Save Event'}</button>
//           </div>
//         </div>
//       )}
//       <div className="event-list">
//         {events.length === 0 ? (
//           <div className="no-events-message">
//             <p>No event at the moment</p>
//             <FontAwesomeIcon icon={faCalendarTimes} className="no-events-icon" />
//           </div>
//         ) : (
//           events.map((event, index) => (
//             <div className="event-item" key={index}>
//               <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={() => handleEditEvent(index)} />
//               <img src={event.picture} alt="Event" className="event-picture" />
//               <div className="event-details">
//                 <p><strong>Title:</strong> {event.title}</p>
//                 <p><strong>Date and Time:</strong> {event.dateTime}</p>
//                 <p><strong>Brief:</strong> {event.brief}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default EventMan;


import React, { useState } from 'react';
import './event-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';

const EventMan = () => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    picture: null,
    title: '',
    dateTime: '',
    description: '',
    brief: ''
  });
  const [events, setEvents] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // New state for tracking the index of the event being edited

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setEventDetails(prevState => ({
      ...prevState,
      picture: URL.createObjectURL(imageFile)
    }));
  };

  const handleSaveEvent = () => {
    // Remove the previously edited event if editIndex is not null
    if (editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents.splice(editIndex, 1);
      setEvents(updatedEvents);
    }
    
    // Handle saving the event details
    setEvents(prevEvents => [...prevEvents, eventDetails]);
    // Reset the form
    setEventDetails({
      picture: null,
      title: '',
      dateTime: '',
      description: '',
      brief: ''
    });
    // Hide the event section
    setIsAddingEvent(false);
    // Reset editIndex to null
    setEditIndex(null);
    // Display alert and navigate to event section
    alert("Event successfully added!");
  };

  const handleEditEvent = (index) => {
    // Set the edit index to the index of the event being edited
    setEditIndex(index);
    // Populate the input fields with the details of the event being edited
    const eventToEdit = events[index];
    setEventDetails({
      picture: eventToEdit.picture,
      title: eventToEdit.title,
      dateTime: eventToEdit.dateTime,
      description: eventToEdit.description,
      brief: eventToEdit.brief
    });
    // Show the event section for editing
    setIsAddingEvent(true);
  };

  return (
    <div className="event-management-main-container">
      {!isAddingEvent ? (
        <button className="add-event-button" onClick={() => setIsAddingEvent(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add Event
        </button>
      ) : (
        <div className="event-section">
          <h2>{editIndex !== null ? 'Edit Event' : 'Add New Event'}</h2>
          <div className="event-form">
            <input type="file" accept="image/*" name="picture" onChange={handleImageChange} />
            {eventDetails.picture && <img src={eventDetails.picture} alt="Event" className="event-picture" />}
            <input type="text" name="title" placeholder="Event Title" value={eventDetails.title} onChange={handleInputChange} />
            <input type="text" name="dateTime" placeholder="Date and Time" value={eventDetails.dateTime} onChange={handleInputChange} />
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
              <img src={event.picture} alt="Event" className="event-picture" />
              <div className="event-details">
                <p><strong>Title:</strong> {event.title}</p>
                <p><strong>Date and Time:</strong> {event.dateTime}</p>
                <p><strong>Brief:</strong> {event.brief}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventMan;
