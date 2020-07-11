let apiURL = "https://dataservice.accuweather.com/";
let apiKey = "IoEXYiqp8BrbPwKUC0qDYGMx3oN22z0d";

function searchWeather(searchInput) {
  fetch(`${apiURL}locations/v1/cities/search?q=${searchInput}&apikey=${apiKey}`).then(result => {
    return result.json();
  }).then(result => {
    currentWeather(result);
    forecastWeather(result);
  })
}

function currentWeather(resultFromServer){  
  let cityKey = resultFromServer[0].Key;
  let cityName = resultFromServer[0].LocalizedName;
  document.getElementById("cityName").innerHTML = cityName;

  fetch(`${apiURL}currentconditions/v1/${cityKey}?apikey=${apiKey}&details=true`).then(result => {
    return result.json();
  }).then(result => {    
        
    let temperature = result[0].Temperature.Metric.Value;
    let unit = result[0].Temperature.Metric.Unit;
    let icon = result[0].WeatherIcon;
    let humidity = result[0].RelativeHumidity;
    let uv = result[0].UVIndexText;
    let wind = Math.round(result[0].WindGust.Speed.Metric.Value);
    
    let weatherIconSrc = document.getElementById("weatherIcon");
    let temperatureSrc = document.getElementById("temperature")

    currentDate();
    getTemperature(temperature, temperatureSrc, unit);
    getWeatherIcon(weatherIconSrc, icon);
    changeStyle(icon);
    getHumidity(humidity);
    getUV(uv);
    getWindSpeed(wind);
  })
}

function currentDate() {
  let date = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let today = weekdays[date.getDay()] + ', ' + months[date.getMonth()] + ' / ' + date.getDate() + ' / ' + date.getFullYear();
  
  document.getElementById("date").innerHTML = today;
}

function getTemperature(temperature, sourceHTML, unit) {
  let roundTemperature = Math.round(temperature);
  sourceHTML.innerHTML = roundTemperature + " º" + unit;
}

function getWeatherIcon(sourceHTML ,iconNumber) {
  switch(iconNumber){
    case 1:
      sourceHTML.src = "icons/01.png";
      break;
    case 2:
      sourceHTML.src = "icons/02.png";
      break;
    case 3:
    case 4:
    case 5:
      sourceHTML.src = "icons/03-05.png";
      break;
    case 6:
    case 7:
    case 8:
    case 9:
      sourceHTML.src = "icons/06-11.png";
      break;
    case 12:
      sourceHTML.src = "icons/12.png";
      break;
    case 13:
    case 14:
      sourceHTML.src = "icons/13-14.png";
      break;
    case 15:
      sourceHTML.src = "icons/15.png";
      break;
    case 16:
    case 17:
      sourceHTML.src = "icons/16-17.png";
      break;
    case 18:
      sourceHTML.src = "icons/18.png";
      break;
    case 19:
      sourceHTML.src = "icons/19.png";
      break;
    case 20:
    case 21:
      sourceHTML.src = "icons/20-21.png";
      break;
    case 22:
    case 23:
      sourceHTML.src = "icons/22-23.png";
      break;
    case 24:
      sourceHTML.src = "icons/24.png";
      break;
    case 25:
    case 26:
      sourceHTML.src = "icons/25-26.png";
      break;
    case 29:
      sourceHTML.src = "icons/29.png";
      break;
    case 30:
      sourceHTML.src = "icons/30.png";
      break;
    case 31:
      sourceHTML.src = "icons/31.png";
      break;
    case 32:
      sourceHTML.src = "icons/32.png";
      break;
    case 33:
      sourceHTML.src = "icons/33.png";
      break;
    case 34:
      sourceHTML.src = "icons/34.png";
      break;
    case 35:
    case 36:
    case 37:
      sourceHTML.src = "icons/35-37.png";
      break;
    case 38:
      sourceHTML.src = "icons/38.png";
      break;
    case 39:
      sourceHTML.src = "icons/39.png";
      break;
    case 40:
      sourceHTML.src = "icons/40.png";
      break;
    case 41:
      sourceHTML.src = "icons/41.png";
      break;
    case 42:
      sourceHTML.src = "icons/42.png";
      break;
    case 43:
    case 44:
      sourceHTML.src = "icons/43-44.png";
      break;
  }
}

function getHumidity(humidity) {
  document.getElementById("humidityIcon").src = "icons/relative-humidity-icon.png";
  document.getElementById("humidityValue").innerHTML = humidity + "%";
}

function getUV(uvIndex) {
  document.getElementById("uvIcon").src = "icons/uv-icon.png";
  document.getElementById("uvValue").innerHTML = uvIndex;
}

function getWindSpeed(wind) {
  document.getElementById("windIcon").src = "icons/windgust-icon.png";
  document.getElementById("windValue").innerHTML = wind + " Km/h";
}

function forecastWeather(resultFromServer) {
  let cityKey = resultFromServer[0].Key;

  fetch(`${apiURL}forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&details=true&metric=true`).then(result => {
    return result.json();
  }).then(result => {
    
    let dailyDate = document.getElementsByClassName("forecastDate"); 
    let dailyIcon = document.getElementsByClassName("forecastIcon");
    let dailyMinTemp = document.getElementsByClassName("forecastMinTemp");
    let dailyMaxTemp = document.getElementsByClassName("forecastMaxTemp");

    for (let i = 1; i < result.DailyForecasts.length; i++) {
      let dateString = result.DailyForecasts[i].Date;
      let icon = result.DailyForecasts[i].Day.Icon;
      let min = result.DailyForecasts[i].Temperature.Minimum.Value;
      let max = result.DailyForecasts[i].Temperature.Maximum.Value;
      let unit = result.DailyForecasts[i].Temperature.Minimum.Unit;      
      
      //Set Date
      let j = i - 1;
      let dateRegex = /(\d+)[-.\/](\d+)[-.\/](\d+)/;
      let dateMatch = dateString.match(dateRegex);
      
      day = new Date(dateMatch[1], dateMatch[2], dateMatch[3]);
      let today = day.getMonth() + "/" + day.getDate();
      
      dailyDate[j].innerHTML = today;

      //Set Icon
      getWeatherIcon(dailyIcon[j], icon);

      //Set Min Temperature
      getTemperature(min, dailyMinTemp[j], unit);

      //Set Max Temperature
      getTemperature(max, dailyMaxTemp[j], unit);
    }
  })
}

function changeStyle(iconNumber) {
  let body = document.getElementById("body");
  let currentDescription = document.getElementById("currentDescription");
  let dailyForecasts = document.getElementsByClassName("dailyForecasts");
  switch(iconNumber) {
    case 1:
    case 2:
    case 30:
      body.style.backgroundImage = "linear-gradient(135deg, rgb(255, 214, 57) , rgb(252, 247, 248))";
      body.style.color = "rgb(48, 52, 63)";
      currentDescription.style.borderColor = "rgb(48, 52, 63)";
      for (let i = 0; i < dailyForecasts.length; i++) {
        dailyForecasts[i].style.borderColor = "rgb(48, 52, 63)";        
      }
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 19:
    case 20:
    case 21:
    case 32:
      body.style.backgroundImage = "linear-gradient(135deg, rgb(144, 194, 231) , rgb(252, 247, 248))";
      body.style.color = "rgb(48, 52, 63)";
      currentDescription.style.borderColor = "rgb(48, 52, 63)";
      for (let i = 0; i < dailyForecasts.length; i++) {
        dailyForecasts[i].style.borderColor = "rgb(48, 52, 63)";        
      }
      break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      body.style.backgroundImage = "linear-gradient(135deg, rgb(48, 52, 63) , rgb(39, 52, 105))";
      body.style.color = "rgb(206, 211, 220)";
      currentDescription.style.borderColor = "rgb(206, 211, 220)";
      for (let i = 0; i < dailyForecasts.length; i++) {
        dailyForecasts[i].style.borderColor = "rgb(206, 211, 220)";        
      }
      break;
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 31:
      body.style.backgroundImage = "linear-gradient(135deg, rgb(206, 211, 220) , rgb(252, 247, 248))";
      body.style.color = "rgb(48, 52, 63)";
      currentDescription.style.borderColor = "rgb(48, 52, 63)";
      for (let i = 0; i < dailyForecasts.length; i++) {
        dailyForecasts[i].style.borderColor = "rgb(48, 52, 63)";        
      }
      break;
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
      body.style.backgroundImage = "linear-gradient(135deg, rgb(73, 65, 109) , rgb(80, 90, 91))";
      body.style.color = "rgb(206, 211, 220)";
      currentDescription.style.borderColor = "rgb(206, 211, 220)";
      for (let i = 0; i < dailyForecasts.length; i++) {
        dailyForecasts[i].style.borderColor = "rgb(206, 211, 220)";        
      }
      break;
    case 39:
    case 40:
    case 41:
    case 42:
      body.style.backgroundImage = "linear-gradient(135deg, rgb(73, 65, 109) , rgb(39, 52, 105))";
      body.style.color = "rgb(206, 211, 220)";
      currentDescription.style.borderColor = "rgb(206, 211, 220)";
      for (let i = 0; i < dailyForecasts.length; i++) {
        dailyForecasts[i].style.borderColor = "rgb(206, 211, 220)";        
      }
      break;
    case 43:
    case 44:
      body.style.backgroundImage = "linear-gradient(135deg, rgb(48, 52, 63) , rgb(206, 211, 220))";
      body.style.color = "rgb(206, 211, 220)";
      currentDescription.style.borderColor = "rgb(206, 211, 220)";
      for (let i = 0; i < dailyForecasts.length; i++) {
        dailyForecasts[i].style.borderColor = "rgb(206, 211, 220)";        
      }
      break;
  }
}

document.getElementById("searchButton").addEventListener("click", () => {
  let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm) {
    searchWeather(searchTerm)
  }
})