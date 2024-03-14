// // AdminDash.js

// import React from 'react';
// import './admin-dash.css';

// const AdminDash = () => {
//   return (
//     <div className='admin-dash-main-container'>
//       <div className="admin-dash-content">
//         <h1>Welcome</h1>
//         <div className="admin-dash-options">
//           <div className="admin-dash-option">
//             <button className="admin-dash-button">User Management</button>
//           </div>
//           <div className="admin-dash-option">
//             <button className="admin-dash-button">Content Management</button>
//           </div>
//           <div className="admin-dash-option">
//             <button className="admin-dash-button">Program Management</button>
//           </div>
//           <div className="admin-dash-option">
//             <button className="admin-dash-button">Donation Management</button>
//           </div>
//           <div className="admin-dash-option">
//             <button className="admin-dash-button">Event Management</button>
//           </div>
//           <div className="admin-dash-option">
//             <button className="admin-dash-button">Communication</button>
//           </div>
//           <div className="admin-dash-option">
//             <button className="admin-dash-button">System Settings</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDash;


// AdminDash.js

import React, { useState } from 'react';
import './admin-dash.css';

const AdminDash = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='admin-dash-main-container'>
      <div className="admin-dash-sidebar">
        <h2>Admin Dashboard</h2>
        <div className="admin-dash-options">
          <button
            className={`admin-dash-option ${selectedOption === 'User Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('User Management')}
          >
            User Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Content Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Content Management')}
          >
            Content Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Program Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Program Management')}
          >
            Program Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Donation Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Donation Management')}
          >
            Donation Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Event Management' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Event Management')}
          >
            Event Management
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'Communication' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Communication')}
          >
            Communication
          </button>
          <button
            className={`admin-dash-option ${selectedOption === 'System Settings' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('System Settings')}
          >
            System Settings
          </button>
        </div>
      </div>
      <div className="admin-dash-content">
        <h1>{selectedOption || 'Welcome'}</h1>
      </div>
    </div>
  );
}

export default AdminDash;
