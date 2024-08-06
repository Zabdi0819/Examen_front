import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/get-token', { username, password });
    const { token } = response.data;

    // Guarda el token en el almacenamiento local
    localStorage.setItem('token', token);

    return token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
