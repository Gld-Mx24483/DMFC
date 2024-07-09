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
};

export default api;