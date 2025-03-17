import axios from 'axios';

const GetProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_BACK_HOST}/auth/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
    return response;
  } catch (error) {
    throw error;
  }
};

export default GetProfile;
