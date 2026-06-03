const input = document.getElementById("inputBox");
const mainCard = document.querySelector(".mainCard");
const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
const card3 = document.querySelector(".card3");
const card4 = document.querySelector(".card4");
const cards = document.getElementById("cards");
const convertor = document.getElementById("convertor");


let currentTemp;
let currentTemp1;
let currentTemp2;
let currentTemp3;
let currentTemp4;

let isFahrenheit = true;


const weatherBackgrounds = {
  clear: "./images/sunny.jpg",
  cloud: "./images/cloudy.jpg",
  rain: "./images/rain.png",
  drizzle: "./images/drizzle.jpg",
  thunderstorm: "./images/storm.png",
  snow: "./images/snow.png",
  mist: "./images/fog.jpg",
  fog: "./images/fog.jpg",
  haze: "./images/haze.png",
};


const API_KEY = "generate API KEY on open weather api it's free"


function generateInfo() {

    let city = input.value.trim();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`)
        .then(res => {
            if(!res.ok) {
                alert(`input a valid city or invalid API key`);
                return;
            }

            return res.json();
        })
       .then(data => {

            if(!data) return;

            currentTemp = data.main.temp;


            const description = data.weather[0].description.toLowerCase();

            let background =  null;

            for (const key in weatherBackgrounds) {
                if (description.includes(key)) {
                    background = weatherBackgrounds[key];
                    break;
                }
            }

            if (background) {
                document.body.style.backgroundImage = `url(${background})`;
            } else {
                document.body.style.backgroundImage = "";
            }
             


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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`)
        .then(res => {
            if(!res.ok) {
                return;
            }

            return res.json();
        })
        .then(data => {
            
            if(!data) return;
            
            currentTemp1 = data.list[0].main.temp;
            currentTemp2 = data.list[8].main.temp;
            currentTemp3 = data.list[16].main.temp;
            currentTemp4 = data.list[24].main.temp;

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

convertor.addEventListener("click", () => {
                const temp = document.querySelector(".temperature");
                const temp1 = card1.querySelector(".temperature");
                const temp2 = card2.querySelector(".temperature");
                const temp3 = card3.querySelector(".temperature");
                const temp4 = card4.querySelector(".temperature");

                if (!temp) return;

                if(isFahrenheit) {
                    temp.textContent = `${((currentTemp - 32) * 5 / 9).toFixed(1)}°C`;
                    temp1.textContent =  `${((currentTemp1 - 32) * 5 / 9).toFixed(1)}°C`;
                    temp2.textContent =  `${((currentTemp2 - 32) * 5 / 9).toFixed(1)}°C`;
                    temp3.textContent =  `${((currentTemp3 - 32) * 5 / 9).toFixed(1)}°C`;
                    temp4.textContent =  `${((currentTemp4 - 32) * 5 / 9).toFixed(1)}°C`;

                } else {
                    temp.textContent = `${currentTemp}°F`
                    temp1.textContent = `${currentTemp1}°F`
                    temp2.textContent = `${currentTemp2}°F`
                    temp3.textContent = `${currentTemp3}°F`
                    temp4.textContent = `${currentTemp4}°F`

                }
                
                isFahrenheit = !isFahrenheit;

            })