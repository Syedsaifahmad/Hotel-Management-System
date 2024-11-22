import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/hotel/getAllHotels';

const fetchAllHotels = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No JWT token found in localStorage');
      return; // Handle the case where no token is found
    }

    const authToken = `Bearer ${token}`;
    console.log('Authorization Token:', authToken); // Ensure the token is correctly formed

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: authToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error; // Rethrow the error for the calling component to handle
  }
};


export default fetchAllHotels;
