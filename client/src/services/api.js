// src/services/api.js
const BASE_URL = 'http://localhost:9000';

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
};

export default api;