// // event-management.js
// import React, { useState } from 'react';
// import './event-management.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// const EventMan = () => {
//   const [isAddingEvent, setIsAddingEvent] = useState(false);
//   const [eventDetails, setEventDetails] = useState({
//     picture: '',
//     title: '',
//     dateTime: '',
//     description: '',
//     brief: ''
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEventDetails(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSaveEvent = () => {
//     // Handle saving the event details
//     console.log("Event details:", eventDetails);
//     // Reset the form
//     setEventDetails({
//       picture: '',
//       title: '',
//       dateTime: '',
//       description: '',
//       brief: ''
//     });
//     // Hide the event section
//     setIsAddingEvent(false);
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
//             <input type="text" name="picture" placeholder="Event Picture URL" value={eventDetails.picture} onChange={handleInputChange} />
//             <input type="text" name="title" placeholder="Event Title" value={eventDetails.title} onChange={handleInputChange} />
//             <input type="text" name="dateTime" placeholder="Date and Time" value={eventDetails.dateTime} onChange={handleInputChange} />
//             <textarea name="description" placeholder="Full Description" value={eventDetails.description} onChange={handleInputChange} />
//             <textarea name="brief" placeholder="Short Brief" value={eventDetails.brief} onChange={handleInputChange} />
//             <button className="save-event-button" onClick={handleSaveEvent}>Save Event</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EventMan;


// event-management.js
import React, { useState } from 'react';
import './event-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EventMan = () => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    picture: null,
    title: '',
    dateTime: '',
    description: '',
    brief: ''
  });

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
    // Handle saving the event details
    console.log("Event details:", eventDetails);
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
          <h2>Add New Event</h2>
          <div className="event-form">
            <input type="file" accept="image/*" name="picture" onChange={handleImageChange} />
            {eventDetails.picture && <img src={eventDetails.picture} alt="Event" className="event-picture" />}
            <input type="text" name="title" placeholder="Event Title" value={eventDetails.title} onChange={handleInputChange} />
            <input type="text" name="dateTime" placeholder="Date and Time" value={eventDetails.dateTime} onChange={handleInputChange} />
            <textarea name="description" placeholder="Full Description" value={eventDetails.description} onChange={handleInputChange} />
            <textarea name="brief" placeholder="Short Brief" value={eventDetails.brief} onChange={handleInputChange} />
            <button className="save-event-button" onClick={handleSaveEvent}>Save Event</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventMan;
