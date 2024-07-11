//api.js
// const BASE_URL = 'http://localhost:9000';
const BASE_URL = 'https://dmfc-backend-server.vercel.app';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

const api = {
  BASE_URL,
  events: {
    getAll: () =>
      fetch(`${BASE_URL}/get-events`)
        .then(handleResponse),
    
    create: (formData) =>
      fetch(`${BASE_URL}/save-event`, {
        method: 'PUT',
        body: formData,
      }).then(handleResponse),
    
    update: (formData) =>
      fetch(`${BASE_URL}/update-event`, {
        method: 'POST',
        body: formData,
      }).then(handleResponse),
    
    delete: (eventId) =>
      fetch(`${BASE_URL}/delete-event/${eventId}`, {
        method: 'DELETE',
      }).then(handleResponse),
  },

  content: {
    getAll: () =>
      fetch(`${BASE_URL}/get-content`)
        .then(handleResponse),
    
    create: (formData) =>
      fetch(`${BASE_URL}/save-content`, {
        method: 'PUT',
        body: formData,
      }).then(handleResponse),
    
    update: (formData) =>
      fetch(`${BASE_URL}/update-content`, {
        method: 'POST',
        body: formData,
      }).then(handleResponse),
    
    delete: (contentId) =>
      fetch(`${BASE_URL}/delete-content/${contentId}`, {
        method: 'DELETE',
      }).then(handleResponse),
  },

  gallery: {
    getAll: () =>
      fetch(`${BASE_URL}/get-media`)
        .then(handleResponse),

    getMedia: () =>
      fetch(`${BASE_URL}/get-media`)
        .then(handleResponse),
    
    upload: (formData) =>
      fetch(`${BASE_URL}/upload-media`, {
        method: 'POST',
        body: formData,
      }).then(handleResponse),
    
    delete: (mediaId) =>
      fetch(`${BASE_URL}/delete-media/${mediaId}`, {
        method: 'DELETE',
      }).then(handleResponse),
  },

  team: {
    submitForm: (formData) =>
      fetch(`${BASE_URL}/submit-team-form`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(handleResponse),

    acceptRequest: (userId) =>
      fetch(`${BASE_URL}/accept-request/${userId}`, {
        method: 'POST',
      }).then(handleResponse),

    getMembers: (status, email) => {
      let url = `${BASE_URL}/get-team-members`;
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (email) params.append('email', email);
      if (params.toString()) url += `?${params.toString()}`;
      return fetch(url).then(handleResponse);
    },

    deleteMember: (userId) =>
      fetch(`${BASE_URL}/delete-team-member/${userId}`, {
        method: 'DELETE',
      }).then(handleResponse),

    rejectRequest: (userId) =>
      fetch(`${BASE_URL}/reject-request/${userId}`, {
        method: 'DELETE',
      }).then(handleResponse),
  },

  volunteers: {
    getAll: () =>
      fetch(`${BASE_URL}/get-volunteers`)
        .then(handleResponse),
    
    create: (formData) =>
      fetch(`${BASE_URL}/submit-volunteer-form`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(handleResponse),
    },

    contact: {
      submitForm: (formData) =>
        fetch(`${BASE_URL}/submit-contact-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then(handleResponse),
  
      getUserMessagesWithAdminResponses: () =>
        fetch(`${BASE_URL}/get-user-messages-with-admin-responses`)
          .then(handleResponse),
  
      getAdminBroadcastMessages: () =>
        fetch(`${BASE_URL}/get-admin-broadcast-messages`)
          .then(handleResponse),
    },

    communication: {
      getContactMessages: () =>
        fetch(`${BASE_URL}/get-contact-messages`)
          .then(handleResponse),
  
      getUserMessagesWithAdminResponses: () =>
        fetch(`${BASE_URL}/get-user-messages-with-admin-responses`)
          .then(handleResponse),
  
      getAdminBroadcastMessages: () =>
        fetch(`${BASE_URL}/get-admin-broadcast-messages`)
          .then(handleResponse),
  
      saveAdminResponse: (userMessageId, userEmail, adminResponse) =>
        fetch(`${BASE_URL}/save-admin-response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userMessageId, userEmail, adminResponse })
        }).then(handleResponse),
  
      submitAdminBroadcast: (message) =>
        fetch(`${BASE_URL}/submit-admin-broadcast`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        }).then(handleResponse),
    },

    blogs: {
      getAll: () =>
        fetch(`${BASE_URL}/get-content`)
          .then(handleResponse),
      
      create: (formData) =>
        fetch(`${BASE_URL}/save-content`, {
          method: 'PUT',
          body: formData,
        }).then(handleResponse),
      
      update: (formData) =>
        fetch(`${BASE_URL}/update-content`, {
          method: 'POST',
          body: formData,
        }).then(handleResponse),
      
      delete: (blogId) =>
        fetch(`${BASE_URL}/delete-content/${blogId}`, {
          method: 'DELETE',
        }).then(handleResponse),
    },
};

export default api;