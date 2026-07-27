// src/services/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.0.26:3000',
});