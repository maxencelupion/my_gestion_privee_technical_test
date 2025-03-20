import axios from 'axios';

const GetProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/auth/me`,
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
