const api = {
    key: "ec2d12ab2c70409c77abe60ff7bc5fab",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    tempValue = `${Math.round(weather.main.temp)}`;

    if (tempValue > 20 & tempValue < 32) {
        var url1 = "./Images/cold.png";
        document.body.style.backgroundImage = `url(${url1})`;
        console.log("Wram Day");
    } 
    
    else if (tempValue < 20) {
        var url1 = "./Images/cold.png";
        document.body.style.backgroundImage = `url(${url1})`;
        console.log("Cold");
    } 
    
    else if (tempValue > 32) {
        var url1 = "./Images/hot.png";
        document.body.style.backgroundImage = `url(${url1})`;
        console.log("Hot");
    }

    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>` 

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = `${weather.weather[0].main}`;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}/°c ${Math.round(weather.main.temp_max)}/°c`;
}


function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ['Sunday', "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}