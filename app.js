//! Selectors
const form = document.querySelector("form");
const input = document.querySelector("form input");
const cardContainer = document.getElementById("card-container");
const alertMessage = document.getElementById("alert");
const searchButton = document.getElementById("search");

//! Variables
const apiKey = "19fadf383f77445c7ead85a8d7ccce88";
let url; //Api isteği için kullanılacak
let cities = []; // Sergilenen şehirlerin isimleri tutulacak
let units = "metric"; // fahrenheit için 'imperial' yazılmalı
let lang = "en"; //Almanca için 'de' yazılacak

//& Location find
const locate = document.getElementById("locate");
const userLocationDiv = document.getElementById("userLocation");
let userLocation = false;
const clockDiv = document.querySelector("#clock");

//& Language

const langButton = document.querySelector(".language");

//! Event listeners

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Default özelliği kullanma yani submit etme
  // console.log(city)

  if (input.value) {
    const city = input.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${apiKey}`;
    // console.log(url)

    getWeatherData();
  }

  form.reset(); // formu sıfırlar
});

locate.addEventListener("click", () => {
  navigator.geolocation?.getCurrentPosition(({ coords }) => {
    // console.log(coords)

    const { latitude, longitude } = coords;

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${apiKey}`;
    userLocation = true;

    clockDiv.classList.replace("d-none", "d-block");

    getWeatherData();
  });
});

langButton.addEventListener("click", (e) => {
  // console.log(e.target.textContent)

  if (e.target.textContent == "DE") {
    input.setAttribute("placeholder", "Suche nach einer Stadt");
    lang = "de";
  } else if (e.target.textContent == "EN") {
    input.setAttribute("placeholder", "Search for a city");
    lang = "en";
  }
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault(); // Default özelliği kullanma yani submit etme
  // console.log(city)

  if (input.value) {
    const city = input.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${apiKey}`;

    console.log(userLocationDiv.textContent);
    getWeatherData();
  }

  input.value = ""; // formu sıfırlar
});

//^ Functions

const getWeatherData = async () => {
  try {
    // const response = await fetch(url).then((response) => response.json()) //& fetch ile

    const response = await axios(url); //^ Axios ile istek atma

    console.log(response); // Api den gelen veri

    //? Data destructure
    // const {main, name, weather, sys} = response //& fetch
    const { main, name, weather, sys } = response.data; //^ axios

    // const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png` //^ openweathermap.org
    const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`; //^ alternatif

    if (cities.indexOf(name) == -1) {
      cities.unshift(name);
      // console.log(cities)

      let card = `       <div class="col" id="${name}">
    <div class="card mb-4 rounded-3 shadow-sm">
            <ul class="list-unstyled mt-2 mb-4">
                <li class="text-end me-2"><i class="bi bi-x-circle"></i></li>
                <h4 class="my-0 fw-normal">${name} <span ><sup><img src="https://flagsapi.com/${
        sys.country
      }/shiny/24.png" class="rounded-circle" alt=${
        sys.country
      }/> </sup></span></h4>
                <h1 class="card-title pricing-card-title"><i class="bi bi-thermometer-half"></i> ${Math.round(
                  main.temp
                )}<sup>°C</sup></h1>
                <h6 class="card-title pricing-card-title">Min : ${Math.round(
                  main.temp_min
                )}<sup>°C</sup> - Max : ${Math.round(
        main.temp_max
      )}<sup>°C</sup>  </h6>
                <h6 class="card-title pricing-card-title"><img src="./assets/wi-barometer.svg" height="30px"/>${
                  main.pressure
                } <img src="./assets/wi-humidity.svg" height="30px"/>${
        main.humidity
      } </h6>
                <li><img src="${iconUrl}"/></li>
                <li>${weather[0].description.toUpperCase()}</li>
            </ul>
    </div>
    </div>`;

      if (userLocation) {
        userLocationDiv.innerHTML = card;
        userLocation = false;
      } else {
        cardContainer.innerHTML = card + cardContainer.innerHTML;
      }
      console.log(cities);
      //! Remove Cities

      const singleClearButton = document.querySelectorAll(".bi-x-circle");

      singleClearButton.forEach((button) => {
        button.addEventListener("click", (e) => {
          // console.log(e.target.closest(".col").id)

          // cities.splice(cities.indexOf(e.target.closest(".col").id), 1); //! Development aşamasında

          delete cities[cities.indexOf(e.target.closest(".col").id)]; //! Array den siler

          if (e.target.closest(".col-md-3")) {
            const closestCol3 = e.target.closest(".col-md-3");
            const clockElement = closestCol3.querySelector("#clock");
            if (clockElement && clockElement.classList.contains("d-block")) {
              clockElement.classList.replace("d-block", "d-none");
            }
          }

          e.target.closest(".col").remove(); //! Dom'dan siler
        });
      });
    } else {
      if (lang == "de") {
        alertMessage.textContent = `Sie kennen das Wetter für die ${name} bereits. Bitte suchen Sie nach einer anderen Stadt 😉`;
      } else {
        alertMessage.textContent = `You already know the weather for ${name}, Please search for another city 😉`;
      }
      alertMessage.classList.replace("d-none", "d-block");

      setTimeout(() => {
        alertMessage.classList.replace("d-block", "d-none");
      }, 3000);
    }
  } catch (error) {
    if (lang == "de") {
      alertMessage.textContent = `Stadt nicht gefunden`;
    } else {
      alertMessage.textContent = `City Not Found!`;
    }

    alertMessage.classList.replace("d-none", "d-block");

    setTimeout(() => {
      alertMessage.classList.replace("d-block", "d-none");
    }, 3000);
  }
};

