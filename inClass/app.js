//! Selectors
const form = document.querySelector("form")
const input =  document.querySelector("form input")
const cardContainer = document.getElementById("card-container")



//! Variables

const apiKey = '4ed283ae2ece6cf1fe2fe7e75b2ea7a5';
let url; //Api isteği için kullanılacak
let cities = [] // Sergilenen şehirlerin isimleri tutulacak
let units = 'metric' // fahrenheit için 'imperial' yazılmalı
let lang = 'en' //Almanca için 'de' yazılacak



//! Event listeners

form.addEventListener("submit", (e)=>{
    e.preventDefault() // Default özelliği kullanma yani submit etme
    // console.log(city)

    const city = input.value
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    // console.log(url)
    getWeatherData()

    form.reset() // formu sıfırlar
})


//^ Functions

const getWeatherData = async () => {

    try {
        
        const response = await fetch(url).then((response) => response.json()) //& fetch ile

        // console.log(response) // Api den gelen veri

        //? Data destructure

        const {main, name, weather, sys} = response //& fetch

        // console.log(weather[0].icon)
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

        let card =
        `       <div class="col" id="${name}">
<div class="card mb-4 rounded-3 shadow-sm">
        <ul class="list-unstyled mt-2 mb-4">
            <li class="text-end me-2"><i class="bi bi-x-circle"></i></li>
            <h4 class="my-0 fw-normal">${name} <span ><sup><img src="https://flagsapi.com/${sys.country}/shiny/24.png" class="rounded-circle" alt=${sys.country}/> </sup></span></h4>
            <h1 class="card-title pricing-card-title"><i class="bi bi-thermometer-half"></i> ${main.temp}<sup>°C</sup></h1>
            <h6 class="card-title pricing-card-title">Min : ${main.temp_min}<sup>°C</sup> - Max : ${main.temp_max}<sup>°C</sup>  </h6>
            <h6 class="card-title pricing-card-title"><img src="./assets/wi-barometer.svg" height="30px"/>${main.pressure} <img src="./assets/wi-humidity.svg" height="30px"/>${main.humidity} </h6>
            <li><img src="${iconUrl}"/></li>
            <li>${weather[0].description}</li>
        </ul>
</div>
</div>`



      cardContainer.innerHTML = card  + cardContainer.innerHTML



    } catch (error) {
        
    }

}