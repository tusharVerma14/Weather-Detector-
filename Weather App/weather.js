// 0e64dd24ce14698d94dcebc9ff0166f4
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weather = {
    key: "0e64dd24ce14698d94dcebc9ff0166f4",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
}

let searchBox = document.getElementById('search-box');
// Adding Event Listner To Search-box
searchBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        document.querySelector('#warning').style.display="none";
        console.log("U have pressed enter");
        let city = searchBox.value;
        getWeatherReport(city);
        document.querySelector('.weather-body').style.display="block";
        searchBox.value="";
    }
})

function getWeatherReport(city) {
    fetch(`${weather.baseUrl}q=${city}&appid=${weather.key}&units=metric`).then(response => response.json())
    .then(showWeatherReport);
    // .catch(()=>{
        // console.log('inside catch block');
        // });

}
function showWeatherReport(data) {
    // console.log("inside showwtherer");
    console.log(data);
    if(`${data.cod}`=='404'){
    document.querySelector('#warning').style.display="block";
    document.querySelector('.weather-body').style.display="none";
    }
    else{
    
        // console.log('No error');
    // Setting up City Section 
    let city = document.getElementById('city');
    city.innerHTML = `${data.name},${data.sys.country}`;

    // Setting up Temperature Section 
    let temperature = document.getElementById('temperature');
    // let tempInCelsius=Math.floor(`${data.main.temp}`-273);
    // alert(tempInCelsius);
    temperature.innerHTML = `${Math.floor(data.main.temp)}&deg;C`;

    // Setting up Min and Max Section
    let minMax = document.getElementById('min-max');
    minMax.innerHTML = `${Math.floor(data.main.temp_min)}(min)/${Math.ceil(data.main.temp_max)}(max)`;

    // Setting up Weather Type Section
    let weatherType = document.getElementById('weather-type');
    let wdtype = `${data.weather[0].main}`
    weatherType.innerHTML = wdtype;

    // Setting up Background Section
    setBackground(wdtype);

    let humidityPressure=document.getElementById('humidity-pressure');
    humidityPressure.innerHTML=`Humidity : ${Math.floor(data.main.humidity)}% , Air Pressure: ${Math.floor(data.main.pressure)}hPa `;


    // Setting up Date Section
    let dt = new Date();
    setDate(dt);
    
}
}

function setBackground(wdtype) {
   

    if (wdtype == 'Clouds') {
        document.body.style = "background:url('Background-gif/Cloud.gif');background-size:cover;background-repeat:no-repeat";
        // document.body.style.background-size ="cover";
        // document.body.style.repeat = "no-repeat";
        image.src="ICONS/cloud.svg";
    }
    else if (wdtype == 'Clear'){
        document.body.style = "background:url('Background-gif/clear.webp');background-size:cover;background-repeat:no-repeat";
        image.src="ICONS/clear.svg";
    }
    else if (wdtype == 'Rain'){
        document.body.style = "background:url('Background-gif/Rain.gif');background-size:cover;background-repeat:no-repeat;";
        image.src="ICONS/rain.svg";
    }
    else if (wdtype == 'Snow'){
        document.body.style = "background:url('Background-gif/Snow.gif');background-size:cover;background-repeat:no-repeat";
        image.src="ICONS/snow.svg";
    }
    else if (wdtype == 'Thunderstorm'){
        document.body.style = "background:url('Background-gif/Thuderstorm.webp');background-size:cover;background-repeat:no-repeat";
        image.src="ICONS/storm.svg";
    }
    else if(wdtype == 'Haze' || wdtype=='Mist'){
        document.body.style = "background:url('Background-gif/haze.gif');background-size:cover;background-repeat:no-repeat";
        image.src="ICONS/haze.svg";
    }
    // else if(wdtype == 'Mist'){
    //     document.body.style = "background:url('Background-gif/haze.gif');background-size:cover;background-repeat:no-repeat";
    //     image.src="ICONS/haze.svg";
    // }
    
    

}

function setDate(dt) {
    let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthArray = ["Januray", "Februray", "March", "April", "May", "June", "August", "September", "October", "November", "December"];
    let day = dayArray[dt.getDay()];
    let month = monthArray[dt.getMonth()];
    let dat = dt.getDate();
    let year = dt.getFullYear();

    let date = document.getElementById('date');
    date.innerHTML = `${dat} ${month} (${day}),${year}`;

}
