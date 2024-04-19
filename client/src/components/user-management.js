// user-management.js
import React, { useState, useEffect } from 'react';
import './user-management.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faAngleDown, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const UserMan = () => {
  const [users, setUsers] = useState([]);
  const [showMoreOptionsDropdown, setShowMoreOptionsDropdown] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:9000/get-team-members');
      const data = await response.json();
      setUsers(data.map(user => ({ ...user, showDropdown: false })));
      setShowMoreOptionsDropdown(data.map(() => false));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const nameMatch = user.fullName.toLowerCase().includes(nameFilter.toLowerCase());
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return formattedDate.replace(',', ''); 
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Delete User data?');
      if (confirmDelete) {
        const response = await fetch(`http://localhost:9000/delete-team-member/${userId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          fetchUsers();
          alert('User deleted successfully');
        } else {
          console.error('Error deleting user:', response.status);
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Date Added</th>
            <th>More Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td data-title="Name">{user.fullName}</td>
              <td data-title="Email">{user.email}</td>
              <td data-title="Address">{user.address}</td>
              <td data-title="Phone Number">{user.phoneNumber}</td>
              <td data-title="Role">{user.role}</td>
              <td data-title="Date Added"> {formatDate(user.createdAt)}</td>
              <td data-title="More Options">
                <div className="more-options">
                  <FontAwesomeIcon icon={faEllipsisH} onClick={() => toggleMoreOptionsDropdown(index)} />
                  {showMoreOptionsDropdown[index] && (
                    <div className="dropdown-content elipse">
                      {/* <a href="#"><FontAwesomeIcon icon={faTrash} /></a> */}
                      <a href="#" onClick={() => deleteUser(user.id)}><FontAwesomeIcon icon={faTrash} /></a>
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