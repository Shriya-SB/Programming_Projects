import React, { useState, useEffect } from 'react';

export default function AnimalSciFyFact({ darkMode }) {
  const [animalName, setAnimalName] = useState('');
  const [animalData, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/animalscifyfact?name=${animalName}`);
      const data = await response.json();
      console.log(data);
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

  useEffect(() => {
    if (animalName) {
      fetchData();
    }
  }, [animalName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimalData(null);
    setError(null);
    setLoading(true);
    // setAnimalName('');
    fetchData();
  };

  const renderAnimalInfo = () => {
    if (!animalData) return null;

    const { name, taxonomy, locations, characteristics } = animalData;

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formatKey = (key) => {
      return capitalizeFirstLetter(key.replace(/_/g, ' '));
    };

    return (
      <div className={`animal-info ${darkMode ? "bg-gray-800 text-white" : "bg-green-50"}`}>
        <h2 className='text-2xl font-semibold mb-4'>Name Of Animal: {name}</h2>
        {taxonomy && (
          <div className="taxonomy">
            <h3>Taxonomy</h3>
            <ul className='space-y-4 text-lg'>
              {Object.entries(taxonomy).map(([key, value]) => (
                <li key={key}><strong>{formatKey(key)}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        )}
        {locations && (
          <div className="locations">
            <h3>Locations</h3>
            <ul className='space-y-4 text-lg'>
              {locations.map((location, index) => (
                <li key={index}>{index + 1}) {location}</li>
              ))}
            </ul>
          </div>
        )}
        {characteristics && (
          <div className="characteristics">
            <h3>Characteristics</h3>
            <ul className='space-y-4'>
              {Object.entries(characteristics).map(([key, value]) => (
                <li key={key} className='text-lg'><strong>{formatKey(key)}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${darkMode ? "bg-gray-700 text-white " : "bg-green-50"}`}>
      <div className={`animal-sci-fy-fact-container min-h-screen`}>
        <form className='animal_form' onSubmit={handleSubmit}>
          <label className='animal_label ml-2' htmlFor="animalName">Enter the name of the animal:</label>
          <div className="flex items-center mb-4">
            <input className={`animal_input ml-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 ${darkMode ? "bg-gray-500 text-white" : ""}`}
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
        {renderAnimalInfo()}
      </div>
    </div>
  );
}
