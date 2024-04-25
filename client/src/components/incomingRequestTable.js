// IncomingRequestTable.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';

const IncomingRequestTable = ({ requests, onAcceptRequest, fetchIncomingRequests }) => {
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

  const handleAcceptRequest = async (userId, email) => {
    const acceptConfirmation = window.confirm("Accept Request?");
  
    if (acceptConfirmation) {
      try {
        const response = await fetch(`https://dmfc-server-sql.vercel.app/accept-request/${userId}`, {
          method: 'POST',
        });
  
        if (response.ok) {
          fetchIncomingRequests();
  
          // Send email
          const templateParams = {
            to_email: email,
            message: 'Your request has been accepted. Welcome to our team!',
          };
  
          emailjs.send('service_97230z5', 'template_3ytf60q', templateParams, 'ig47yihiXPhRzPqZH')
            .then((response) => {
              console.log('Email sent:', response);
              alert('Request accepted and email sent successfully!');
            })
            .catch((error) => {
              console.error('Error sending email:', error);
              alert('Request accepted, but there was an error sending the email!');
            });
        } else {
          console.error('Error accepting request:', response.status);
        }
      } catch (error) {
        console.error('Error accepting request:', error);
      }
    }
  };

  const handleRejectRequest = async (userId) => {
    const rejectConfirmation = window.confirm("Cancel Request?");

    if (rejectConfirmation) {
      try {
        const response = await fetch(`https://dmfc-server-sql.vercel.app/reject-request/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchIncomingRequests();
          alert("Successfully deleted");
        } else {
          console.error('Error rejecting request:', response.status);
        }
      } catch (error) {
        console.error('Error rejecting request:', error);
      }
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
              <td data-title="Actions" className="actions-icons">
                <FontAwesomeIcon icon={faCheck} className="accept-icon" onClick={() => handleAcceptRequest(request.id, request.email)} />
                <FontAwesomeIcon icon={faTimes} className="reject-icon" onClick={() => handleRejectRequest(request.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingRequestTable;