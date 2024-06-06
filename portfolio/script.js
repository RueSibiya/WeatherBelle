const apiKey = '1da183f71d1b58d9a76f882b6308d319';

function getWeather() {
    const locationInput = document.getElementById('location-input').value.trim();
    if (!locationInput.match(/^[a-zA-Z\s]+$/)) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert('City not found');
            }
            return response.json();
        })
        .then(data => {
            const location = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const weatherId = data.weather[0].id;
            const iconClass = `owf-${weatherId}`; // Get the icon class
            const recommendation = getRecommendation(temperature, weatherId);

            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('description').textContent = description;
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.className = `owf ${iconClass}`; // Update the icon class
            document.getElementById('recommendation').textContent = recommendation;
        })
        .catch(error => { 
            alert(error.message);
            console.error('Error:', error);
        });
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