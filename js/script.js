const API_KEY = "d35743ffe0315d66aef9597855a346c4";

const fetchData = position =>{
    const {latitude,longitude}= position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric&lat=${latitude}&lon=${longitude}&lang=sp&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))

    console.log(position);
}

const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description:data.weather[0].description,
        humidity: data.main.humidity +"%" ,
        temperature:  Math.floor(data.main.temp) + "°",
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key]);
    });

    
  
}

const getDate = () =>{
    let date = new Date();
    return`${date.getDate()}/${('0' + (date.getMonth()+ 1)).slice(-2)}/${date.getFullYear()}`
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}



let html = document.getElementById("hora");

setInterval(function(){
	tiempo = new Date();

	horas = tiempo.getHours();
	minutos = tiempo.getMinutes();
	
	//evitar los 0 o numeros individuales
	if(horas<10)
		horas = "0"+horas;
	if(minutos<10)
		minutos = "0"+minutos;
	

	html.innerHTML = horas+" : "+ minutos;
},1000);







const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
} 