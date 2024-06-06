const apiKey = '1da183f71d1b58d9a76f882b6308d319';

         // Fetch current location and display weather when page loads
         window.onload = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async function(position) {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
                    const data = await response.json();
                    displayCurrentLocation(data);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        }



        function getWeather() {
            const locationInput = document.getElementById('location-input').value.trim();
            if (!locationInput.match(/^[a-zA-Z\s]+$/)) {
                alert('Please enter a city name');
                return;
            }

            fetchWeatherData(locationInput);
        }

        async function fetchWeatherData(location) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            displayWeather(data);
        }    

        function displayWeather(data) {
                    const location = data.name;
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;
                    const weatherId = data.weather[0].id;
                    const iconClass = `owf-${weatherId}`;
                    const recommendation = getRecommendation(temperature, weatherId);

                    document.getElementById('location').textContent = location;
                    document.getElementById('temperature').textContent = `${temperature}°C`;
                    document.getElementById('description').textContent = description;
                    const weatherIcon = document.getElementById('weather-icon');
                    weatherIcon.className = `owf ${iconClass} icon-large`;
                    document.getElementById('recommendation').textContent = recommendation;
                    
                }
                
        
        function displayCurrentLocation(data) {
            const location = data.name;
            const temperature = data.main.temp;
            const weatherId = data.weather[0].id;
            const iconClass = `owf-${weatherId}`;



            document.getElementById('current-location').textContent = location;
            document.getElementById('current-temp').textContent = `${temperature}°C`;
            const currentWeatherIcon = document.getElementById('current-weather-icon');
            currentWeatherIcon.className = `owf ${iconClass} icon-large`;
        }

        function getRecommendation(temp, weatherId) {
            let recommendation = '';

            if (temp < 10) {
                recommendation = 'It\'s quite cold! Wear a warm coat, scarf, and gloves.';
            } else if (temp < 20) {
                recommendation = 'A bit chilly. A jacket or sweater would be a good choice.';
            } else if (temp < 30) {
                recommendation = 'Nice weather! Light clothing is recommended.';
            } else if (temp >= 30) {
                recommendation = 'It\'s hot outside! Stay cool with shorts and a t-shirt. Remember to stay hydrated!';
            }

            if (weatherId >= 200 && weatherId < 600) {
                recommendation += ' Don\'t forget to carry an umbrella!';
            }

            return recommendation;
        }

        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('current-time').textContent = `${timeString}`;
        }

        // Update the time every second
        setInterval(updateTime, 1000);

        // Initial call to set the time immediately
        updateTime();
