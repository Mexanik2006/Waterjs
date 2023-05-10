const api = {
    key: "aeb9a648de45dc65828b34450d2ec0df",
    baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {  
    if(e.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults); 
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>C</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;
    
    let hilow = document.querySelector(".hilow");
    hilow.innerHTML = `${Math.round(weather.temp_min)}c / ${Math.round(weather.main.temp_max)}c`;
}

function dateBuilder(s) {
    let oylar = [
        'Yanvar',
        'Fevral', 
        'Mart', 
        'Aprel', 
        'May', 
        'Iyun', 
        'Iyul', 
        'Avgust', 
        'Sentyabr', 
        'Oktyabr', 
        'Noyabr', 
        'Dekabr'
    ];
    let kunlar = [
        "Dushanba",
        "Seshanba",
        "Chorshanba",
        "Payshanba",
        "Juma",
        "Shanba",
        "Yakshanba",
    ];

    let day = kunlar[s.getDay()];
    let date = s.getDate();
    let month = oylar[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;
} 