const input = document.getElementById("inputBox");
const mainCard = document.querySelector(".mainCard");
const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
const card3 = document.querySelector(".card3");
const card4 = document.querySelector(".card4");
const cards = document.getElementById("cards");



const API_KEY = "GENERATE AN API KEY FROM OPEN WEATHER IT'S FREE";

function generateInfo() {

    let city = input.value.trim();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`)
        .then(res => {
            if(!res.ok) {
                alert(`input a valid city or API key may not be valid`);
                return;
            }

            return res.json();
        })
        .then(data => {

            if(!data) return;

            mainCard.innerHTML = `
            <h2 class="cityName">${data.name}</h2>
            <p class="temperature">${data.main.temp}°F</p>
            <p class="description">${data.weather[0].description}</p>
            <p class="humidity">Humidity: ${data.main.humidity}%</p>
            <p class="wind">Wind: ${data.wind.speed} mph</p>
            <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            `;

            mainCard.style.display = "flex";



        })
    
    //fetch next 5 days
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`)
        .then(res => {
            if(!res.ok) {
                return;
            }

            return res.json();
        })
        .then(data => {

            if(!data) return;

            card1.innerHTML = `
                <h2 class="cityName">${new Date(data.list[0].dt_txt).toLocaleDateString("en-US", { weekday:"long"})}</h2>
                <p class="temperature">${data.list[0].main.temp}°F</p>
                <p class="description">${data.list[0].weather[0].description}</p>
                <p class="humidity">Humidity: ${data.list[0].main.humidity}%</p>
                <p class="wind">Wind: ${data.list[0].wind.speed} mph</p>
                <img class="icon" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">                
                
                `;

                card2.innerHTML = `
                <h2 class="cityName">${new Date(data.list[8].dt_txt).toLocaleDateString("en-US", { weekday:"long"})}</h2>
                <p class="temperature">${data.list[8].main.temp}°F</p>
                <p class="description">${data.list[8].weather[0].description}</p>
                <p class="humidity">Humidity: ${data.list[8].main.humidity}%</p>
                <p class="wind">Wind: ${data.list[8].wind.speed} mph</p>
                <img class="icon" src="https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png">                
                
                `;

                card3.innerHTML = `
                <h2 class="cityName">${new Date(data.list[16].dt_txt).toLocaleDateString("en-US", { weekday:"long"})}</h2>
                <p class="temperature">${data.list[16].main.temp}°F</p>
                <p class="description">${data.list[16].weather[0].description}</p>
                <p class="humidity">Humidity: ${data.list[16].main.humidity}%</p>
                <p class="wind">Wind: ${data.list[16].wind.speed} mph</p>
                <img class="icon" src="https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png">                
                
                `;

                card4.innerHTML = `
                <h2 class="cityName">${new Date(data.list[24].dt_txt).toLocaleDateString("en-US", { weekday:"long"})}</h2>
                <p class="temperature">${data.list[24].main.temp}°F</p>
                <p class="description">${data.list[24].weather[0].description}</p>
                <p class="humidity">Humidity: ${data.list[24].main.humidity}%</p>
                <p class="wind">Wind: ${data.list[24].wind.speed} mph</p>
                <img class="icon" src="https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png">                
                
                `;

                cards.style.display = "flex";


            })
    }