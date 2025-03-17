import axios from 'axios';

const PostLogin = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACK_HOST}/auth/login`, data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default PostLogin;
