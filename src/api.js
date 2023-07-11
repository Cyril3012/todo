import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users/1/todos';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};