// user-management.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import IncomingRequestTable from './incomingRequestTable';
import MembersTable from './membersTable';
import './user-management.css';
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
      const data = await api.team.getMembers('pending');
      setIncomingRequests(data);
    } catch (error) {
      setError('Error fetching incoming requests');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTeamMembers = async () => {
    try {
      const data = await api.team.getMembers('accepted');
      setTeamMembers(data);
    } catch (error) {
      setError('Error fetching team members');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      await api.team.acceptRequest(userId);
      fetchIncomingRequests();
      fetchTeamMembers();
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
      {showIncomingRequests && (
        <IncomingRequestTable
          requests={incomingRequests}
          onAcceptRequest={handleAcceptRequest}
          fetchIncomingRequests={fetchIncomingRequests}
        />
      )}
      {!showIncomingRequests && !showVolunteers && (
        <MembersTable members={teamMembers} />
      )}
      {showVolunteers && (
        <VolunteerTable />
      )}
    </div>
  );
};

export default UserMan;