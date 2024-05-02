// Create an asynchronous function and pass a city
const getWeather = async (city) => {
    // Set city name by default
    cityName.innerHTML = city
    // Connect with API
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    // Once you fetch the data replace the value with city info
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        cloud_pct.innerHTML = result.cloud_pct
        feels_like.innerHTML = result.feels_like
        humidity.innerHTML = result.humidity
        max_temp.innerHTML = result.max_temp
        min_temp.innerHTML = result.min_temp
        sunrise.innerHTML = result.sunrise
        sunset.innerHTML = result.sunset
        temp.innerHTML = result.temp
        wind_degrees.innerHTML = result.wind_degrees
        wind_speed.innerHTML = result.wind_speed
    } catch (error) {
        console.error(error);
    }
}
// Make search button functional
search.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(city.value)
})
// Let the by default city be Delhi.
getWeather('Delhi')