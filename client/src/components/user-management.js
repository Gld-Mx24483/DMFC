// user-management.js
import React, { useState } from 'react';
import './user-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faAngleDown, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const UserMan = () => {
  const initialUsers = [
    { name: 'John Doe', email: 'john@example.com', role: 'Editor', dateAdded: 'Feb 22, 2022', lastActive: 'Feb 24, 2022', showDropdown: false },
    { name: 'Jane Doe', email: 'jane@example.com', role: 'Creator', dateAdded: 'Feb 25, 2022', lastActive: 'Feb 26, 2022', showDropdown: false },
    { name: 'James Doe', email: 'jane@example.com', role: 'Creator', dateAdded: 'Feb 27, 2022', lastActive: 'Feb 28, 2022', showDropdown: false },
    // Add more users here as needed
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showMoreOptionsDropdown, setShowMoreOptionsDropdown] = useState(initialUsers.map(() => false));
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(nameFilter.toLowerCase());
    const roleMatch = user.role.toLowerCase().includes(roleFilter.toLowerCase());
    return nameMatch && roleMatch;
  });

  const handleRoleChange = (index, role) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], role, showDropdown: false };
      return updatedUsers;
    });
  };

  const toggleDropdown = (index) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], showDropdown: !updatedUsers[index].showDropdown };
      return updatedUsers;
    });
  };

  const toggleMoreOptionsDropdown = (index) => {
    setShowMoreOptionsDropdown(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="user-management-main-container">
      <div className="filter-section">
        <input type="text" placeholder="Search by Name" value={nameFilter} onChange={handleNameFilterChange} />
        <input type="text" placeholder="Search by Role" value={roleFilter} onChange={handleRoleFilterChange} />
      </div>
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
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <div>{user.name}</div>
                <div className="email">{user.email}</div>
              </td>
              <td>
                <div className={`dropdown ${user.role.toLowerCase()}`}>
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
                  <FontAwesomeIcon icon={faEllipsisH} onClick={() => toggleMoreOptionsDropdown(index)} />
                  {showMoreOptionsDropdown[index] && (
                    <div className="dropdown-content elipse">
                      <a href="#"><FontAwesomeIcon icon={faTrash} /></a>
                      <a href="#"><FontAwesomeIcon icon={faPen} /></a>
                    </div>
                  )}
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