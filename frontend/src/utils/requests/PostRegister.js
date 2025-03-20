import axios from 'axios';

const PostRegister = async (data) => {
  console.log(import.meta.env.VITE_BACK_LOCALHOST)
  try {
    const response = await axios.post(`/auth/register`, data,
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

export default PostRegister;
