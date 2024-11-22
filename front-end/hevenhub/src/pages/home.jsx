import React, { useEffect, useState } from 'react';
import fetchAllHotels from '../services/hotel-service';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const fetchedHotels = await fetchAllHotels();
        setHotels(fetchedHotels);
        setErrorMessage(''); // Clear any previous error
      } catch (error) {
        console.error('Error fetching hotels:', error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Unauthorized access. Please log in again.');
        } else {
          setErrorMessage('An error occurred while fetching hotels.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>; // Display error message
  }

  if (!hotels || hotels.length === 0) {
    return <div>No hotels available.</div>;
  }

  return (
    <div>
      <h2>Hotel List</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>{hotel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
