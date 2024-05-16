import React, { useState } from 'react';

const AnimalSciFyFact = ({ initialData, darkMode }) => {
  const [animalName, setAnimalName] = useState('');
  const [animalData, setAnimalData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/animalscifyfact?name=${animalName}`);
      const data = await response.json();

      if (data.success && data.result.length > 0) {
        setAnimalData(data.result[0]); // Access the first element of the result array
      } else {
        setError('Failed to fetch animal facts');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-green-50'}`}>
      <div className={`animal-sci-fy-fact-container min-h-screen`}>
        <form className='animal_form' onSubmit={handleSubmit}>
          <label className='animal_label ml-2' htmlFor="animalName">Enter the name of the animal:</label>
          <div className="flex items-center mb-4">
            <input className={`animal_input ml-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 ${darkMode ? 'bg-gray-500 text-white' : ''}`}
              type="text"
              id="animalName"
              placeholder="E.g., Lion, Elephant, Tiger"
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
            />
            <button className='animal_button mx-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600' type="submit">Submit</button>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {animalData && (
          <div className={`animal-info ${darkMode ? 'bg-gray-800 text-white' : 'bg-green-50'}`}>
            <h2 className='text-2xl font-semibold mb-4'>Name Of Animal: {animalData.name}</h2>
            {animalData.taxonomy && (
              <div className="taxonomy">
                <h3>Taxonomy</h3>
                <ul className='space-y-4 text-lg'>
                  {Object.entries(animalData.taxonomy).map(([key, value]) => (
                    <li key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}
            {animalData.locations && (
              <div className="locations">
                <h3>Locations</h3>
                <ul className='space-y-4 text-lg'>
                  {animalData.locations.map((location, index) => (
                    <li key={index}>{index + 1}) {location}</li>
                  ))}
                </ul>
              </div>
            )}
            {animalData.characteristics && (
              <div className="characteristics">
                <h3>Characteristics</h3>
                <ul className='space-y-4'>
                  {Object.entries(animalData.characteristics).map(([key, value]) => (
                    <li key={key} className='text-lg'><strong>{key.replace(/_/g, ' ')}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { name } = query;

  try {
    const response = await fetch(`/api/animalscifyfact?name=${name}`);
    const data = await response.json();

    if (data.success && data.result.length > 0) {
      return {
        props: {
          initialData: data.result[0],
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

export default AnimalSciFyFact;
