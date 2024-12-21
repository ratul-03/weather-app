function getWeather() {
  const apiKey = 'd54367689b149d528933b7c71cd2f50b';
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city');
    return;
  }

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Fetch current weather data
  fetch(weatherURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please check your API key and try again.');
    });

  // Fetch forecast data
  fetch(forecastURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayHourlyForecast(data.list);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please check your API key and try again.');
    });
}

function displayWeather(data) {
  if (!data || !data.main || !data.weather) {
    alert('Weather data is not available');
    return;
  }
  document.getElementById(
    'temp-div'
  ).innerHTML = `Temperature: ${data.main.temp} K`;
  document.getElementById(
    'weather-info'
  ).innerHTML = `Weather: ${data.weather[0].description}`;
  const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById('icon').src = iconURL;
}

function displayHourlyForecast(forecast) {
  if (!forecast || !Array.isArray(forecast)) {
    alert('Forecast data is not available');
    return;
  }
  const forecastDiv = document.getElementById('hourly-forcast');
  forecastDiv.innerHTML = '';
  forecast.forEach(f => {
    const hour = document.createElement('div');
    hour.innerHTML = `${new Date(f.dt * 1000).toLocaleTimeString()}: ${
      f.main.temp
    } K`;
    forecastDiv.appendChild(hour);
  });
}
