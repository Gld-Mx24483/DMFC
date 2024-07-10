// VolunteerTable.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const VolunteerTable = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await api.volunteers.getAll();
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

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
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Volunteer For</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer, index) => (
            <tr key={index}>
              <td data-title="Name">{volunteer.fullName}</td>
              <td data-title="Email">{volunteer.email}</td>
              <td data-title="Address">{volunteer.address}</td>
              <td data-title="Phone Number">{volunteer.phoneNumber}</td>
              <td data-title="Volunteer For">{volunteer.volunteerFor}</td>
              <td data-title="Date Added">{formatDate(volunteer.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerTable;