// user-management.js
import React, { useState } from 'react';
import './user-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const UserMan = () => {
  // Sample static users data
  const initialUsers = [
    { name: 'John Doe', email: 'john@example.com', role: 'Editor', dateAdded: 'Feb 22, 2022', lastActive: 'Feb 24, 2022', showDropdown: false },
    { name: 'Jane Doe', email: 'jane@example.com', role: 'Creator', dateAdded: 'Feb 25, 2022', lastActive: 'Feb 26, 2022', showDropdown: false },
    // Add more users here as needed
  ];

  // State to store users
  const [users, setUsers] = useState(initialUsers);

  // Function to handle role change for a user
  const handleRoleChange = (index, role) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], role, showDropdown: false };
      return updatedUsers;
    });
    // Here you can implement the logic to update the user role in the backend
  };

  // Function to toggle dropdown visibility for a user
  const toggleDropdown = (index) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], showDropdown: !updatedUsers[index].showDropdown };
      return updatedUsers;
    });
  };

  return (
    <div className="user-management-main-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date added</th>
            <th>Last active</th>
            <th>More Option</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <div>{user.name}</div>
                <div className="email">{user.email}</div>
              </td>
              <td>
                <div className="dropdown">
                  <div className="role-wrapper">
                    {user.role}
                    <FontAwesomeIcon icon={faAngleDown} className="down-icon" onClick={() => toggleDropdown(index)} />
                  </div>
                  {user.showDropdown && (
                    <div className="dropdown-content">
                      <a href="#" onClick={() => handleRoleChange(index, 'Editor')}>Editor</a>
                      <a href="#" onClick={() => handleRoleChange(index, 'Blogger')}>Blogger</a>
                      <a href="#" onClick={() => handleRoleChange(index, 'Creator')}>Creator</a>
                    </div>
                  )}
                </div>
              </td>
              <td>{user.dateAdded}</td>
              <td>{user.lastActive}</td>
              <td>
                <div className="more-options">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserMan;
