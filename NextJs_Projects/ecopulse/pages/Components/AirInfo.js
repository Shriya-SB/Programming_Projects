import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const AirInfo = ({ initialData }) => {
  const router = useRouter()
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('ecopulse'));
    if (!token) {
      router.push('/Components/Login')
    }
  }, [])

  const [city, setCity] = useState('');
  const [airQualityData, setAirQualityData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/airinfo?city=${city}`);
      const data = await response.json();

      if (data.success) {
        setAirQualityData(data.result);
      } else {
        setError('Failed to fetch air quality data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching air quality data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">Air Quality Information</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex items-center justify-center">
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-green-500"
          />
          <button type="submit" className="ml-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Get Data</button>
        </form>
        {loading && <p className="text-center">Loading air quality data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {airQualityData && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Air Quality Data for {city}:</h2>
            <ul className="list-disc pl-4">
              <li>CO: {airQualityData.CO && airQualityData.CO.concentration}</li>
              <li>NO2: {airQualityData.NO2 && airQualityData.NO2.concentration}</li>
              <li>O3: {airQualityData.O3 && airQualityData.O3.concentration}</li>
              <li>SO2: {airQualityData.SO2 && airQualityData.SO2.concentration}</li>
              <li>PM2.5: {airQualityData['PM2.5'] && airQualityData['PM2.5'].concentration}</li>
              <li>PM10: {airQualityData.PM10 && airQualityData.PM10.concentration}</li>
              <li>Overall AQI: {airQualityData.overall_aqi}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { city } = query;

  try {
    const response = await fetch(`https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${city}`);
    const data = await response.json();

    if (data.success) {
      return {
        props: {
          initialData: data.result,
        },
      };
    } else {
      return {
        props: {
          initialData: null,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: null,
      },
    };
  }
};

export default AirInfo;
