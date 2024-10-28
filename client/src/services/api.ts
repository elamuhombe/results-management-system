//src/services/api.ts

import axios from 'axios';

// set base url
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5300/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
