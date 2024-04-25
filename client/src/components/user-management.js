// user-management.js
import React, { useState, useEffect } from 'react';
import './user-management.css';
import IncomingRequestTable from './incomingRequestTable';
import MembersTable from './membersTable';
import VolunteerTable from './volunteerTable';

const UserMan = () => {
  const [showIncomingRequests, setShowIncomingRequests] = useState(true);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncomingRequests();
    fetchTeamMembers();
  }, []);

  const fetchIncomingRequests = async () => {
    try {
      const response = await fetch('https://dmfc-server-sql.vercel.app/get-team-members?status=pending');
      if (response.ok) {
        const data = await response.json();
        setIncomingRequests(data);
      } else {
        setError('Error fetching incoming requests');
      }
    } catch (error) {
      setError('Error fetching incoming requests');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('https://dmfc-server-sql.vercel.app/get-team-members?status=accepted');
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      } else {
        setError('Error fetching team members');
      }
    } catch (error) {
      setError('Error fetching team members');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      const response = await fetch(`https://dmfc-server-sql.vercel.app/accept-request/${userId}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        fetchIncomingRequests();
        fetchTeamMembers();
      } else {
        setError('Error accepting request');
      }
    } catch (error) {
      setError('Error accepting request');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-management-main-container">
      <div className="button-container">
        <button
          className={showIncomingRequests ? 'active' : ''}
          onClick={() => {
            setShowIncomingRequests(true);
            setShowVolunteers(false);
          }}
        >
          Incoming Member Requests
        </button>
        <button
          className={!showIncomingRequests && !showVolunteers ? 'active' : ''}
          onClick={() => {
            setShowIncomingRequests(false);
            setShowVolunteers(false);
          }}
        >
          Members in the Team
        </button>
        <button
          className={showVolunteers ? 'active' : ''}
          onClick={() => {
            setShowIncomingRequests(false);
            setShowVolunteers(true);
          }}
        >
          Volunteers
        </button>
      </div>
      {showIncomingRequests && incomingRequests.length > 0 && (
        <IncomingRequestTable
          requests={incomingRequests}
          onAcceptRequest={handleAcceptRequest}
          fetchIncomingRequests={fetchIncomingRequests}
        />
      )}
      {!showIncomingRequests && !showVolunteers && teamMembers.length > 0 && (
        <MembersTable members={teamMembers} />
      )}
      {showVolunteers && (
        <VolunteerTable />
      )}
    </div>
  );
};

export default UserMan;
