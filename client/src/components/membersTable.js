// members.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const MembersTable = ({ members }) => {
  const [showMoreOptionsDropdown, setShowMoreOptionsDropdown] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const filteredMembers = members.filter(member => {
    const nameMatch = member.fullName.toLowerCase().includes(nameFilter.toLowerCase());
    const roleMatch = member.role.toLowerCase().includes(roleFilter.toLowerCase());
    return nameMatch && roleMatch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedDate.replace(',', '');
  };

  const toggleMoreOptionsDropdown = (index) => {
    setShowMoreOptionsDropdown((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Delete User data?');
      if (confirmDelete) {
        const response = await fetch(`http://localhost:9000/delete-team-member/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Fetch updated team members data
        } else {
          console.error('Error deleting user:', response.status);
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
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
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td data-title="Name">{member.fullName}</td>
              <td data-title="Email">{member.email}</td>
              <td data-title="Address">{member.address}</td>
              <td data-title="Phone Number">{member.phoneNumber}</td>
              <td data-title="Role">{member.role}</td>
              <td data-title="Date Added"> {formatDate(member.createdAt)}</td>
              <td data-title="More Options">
                <div className="more-options">
                  <FontAwesomeIcon icon={faEllipsisH} onClick={() => toggleMoreOptionsDropdown(index)} />
                  {showMoreOptionsDropdown[index] && (
                    <div className="dropdown-content elipse">
                      <a href="#" onClick={() => deleteUser(member.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </a>
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
};

export default MembersTable;