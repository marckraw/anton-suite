import axios from 'axios';

export const setupAxios = () => {
  // Any browser-specific axios config
  axios.defaults.withCredentials = true;
  // Add more browser-specific setup as needed
};
