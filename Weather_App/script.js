const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_body = document.querySelector(".weather-body");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const error_div = document.querySelector(".error");
const country = document.getElementById("country");
const longitude = document.getElementById("long");
const latitude = document.getElementById("lat");


async function checkWeather(city){
    const api_key = "9312ff941dfaffefdcc53c5abe98d2c4";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const fetchWeather = await fetch(`${api}`);
        const final_Weather  = await fetchWeather.json();
        console.log(final_Weather);
        description.innerHTML = "Loading...";


        setTimeout(() => {
                    
            if(final_Weather.cod === "404"){
                weather_body.style.display = "none";
                error_div.style.display = "block";
            }
            else{
                weather_body.style.display= "flex";
                error_div.style.display = "none";
                temperature.innerHTML = `${Math.round(final_Weather.main.temp - 273.15)}°C`
                description.innerHTML = `${final_Weather.weather[0].description}`;
                humidity.innerHTML = `${final_Weather.main.humidity}%`;
                wind_speed.innerHTML  = `${final_Weather.wind.speed}Km/H`;
                country.textContent = `${final_Weather.sys.country}`;
                longitude.textContent = `${final_Weather.coord.lon}`;
                latitude.textContent  = `${final_Weather.coord.lat}`;

    
                switch(final_Weather.weather[0].main){
                    case "Clouds":
                        weather_img.src = "Images/cloud.png";
                        break;
                    case "Clear":
                        weather_img.src = "Images/clear.png";
                        break;
                    case "Haze":
                        weather_img.src = "Images/clear.png"
                        break;
                    case "Rain":
                        weather_img.src = "Images/rain.png";
                        break;
                    case "Mist":
                        weather_img.src = "Images/mist.png";
                        break;
                    case "Snow":
                        weather_body.src = "Images/snow.png";
                        break;
                };
            }
        }, 2000);

        
    } catch (error) {
        console.log(error);
    }

    
}
searchBtn.addEventListener("click",()=>{
    checkWeather(inputBox.value);
});
