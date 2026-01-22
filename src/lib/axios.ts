import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Point to NestJS backend
  headers: {
    // Axios sets Content-Type to multipart/form-data automatically when FormData is used
    // and application/json for JSON objects.
    // So we don't force it here.
  },
});

export default api;
