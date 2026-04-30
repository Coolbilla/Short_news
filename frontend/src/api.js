import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchNews = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news?category=${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const categories = [
  'all',
  'national',
  'business',
  'sports',
  'world',
  'politics',
  'technology',
  'startup',
  'entertainment',
  'miscellaneous',
  'hatke',
  'science',
  'automobile'
];
