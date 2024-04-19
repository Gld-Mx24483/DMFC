// IncomingRequestTable.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const IncomingRequestTable = ({ requests, onAcceptRequest }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const filteredRequests = requests.filter(request => {
    const nameMatch = request.fullName.toLowerCase().includes(nameFilter.toLowerCase());
    const roleMatch = request.role.toLowerCase().includes(roleFilter.toLowerCase());
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
            <th>Date Requested</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr key={index}>
              <td data-title="Name">{request.fullName}</td>
              <td data-title="Email">{request.email}</td>
              <td data-title="Address">{request.address}</td>
              <td data-title="Phone Number">{request.phoneNumber}</td>
              <td data-title="Role">{request.role}</td>
              <td data-title="Date Requested">{formatDate(request.createdAt)}</td>
              <td data-title="Actions">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="accept-icon"
                  onClick={() => onAcceptRequest(request.id)}
                />
                <FontAwesomeIcon icon={faTimes} className="reject-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingRequestTable;