//! Selectors
const form = document.querySelector("form")
const input =  document.querySelector("form input")



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
        
        const response = await fetch(url).then((response) => response.json())

        console.log(response) // Api den gelen veri








    } catch (error) {
        
    }

}