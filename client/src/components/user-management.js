// user-management.js
import React, { useState, useEffect } from 'react';
import './user-management.css';
import IncomingRequestTable from './incomingRequestTable';
import MembersTable from './membersTable';

const UserMan = () => {
  const [showIncomingRequests, setShowIncomingRequests] = useState(true);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchIncomingRequests();
    fetchTeamMembers();
  }, []);

  const fetchIncomingRequests = async () => {
    try {
      const response = await fetch('http://localhost:9000/get-team-members?status=pending');
      const data = await response.json();
      setIncomingRequests(data);
    } catch (error) {
      console.error('Error fetching incoming requests:', error);
    }
  };
  
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:9000/get-team-members?status=accepted');
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/accept-request/${userId}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        fetchIncomingRequests();
        fetchTeamMembers();
      } else {
        console.error('Error accepting request:', response.status);
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  return (
    <div className="user-management-main-container">
      <div className="button-container">
        <button
          className={showIncomingRequests ? 'active' : ''}
          onClick={() => setShowIncomingRequests(true)}
        >
          Incoming Member Requests
        </button>
        <button
          className={!showIncomingRequests ? 'active' : ''}
          onClick={() => setShowIncomingRequests(false)}
        >
          Members in the Team
        </button>
      </div>
      {showIncomingRequests ? (
        <IncomingRequestTable
          requests={incomingRequests}
          onAcceptRequest={handleAcceptRequest}
        />
      ) : (
        <MembersTable members={teamMembers} />
      )}
    </div>
  );
};

export default UserMan;