//! Selectors
const form = document.querySelector("form");
const input = document.querySelector("form input");
const cardContainer = document.getElementById("card-container");
const alertMessage = document.querySelector("#alert");
const engLi = document.querySelector("#eng");
const deLi = document.querySelector("#de");

//! Variables

const apiKey = "19fadf383f77445c7ead85a8d7ccce88";
let url; //Api isteği için kullanılacak
let cities = []; // Sergilenen şehirlerin isimleri tutulacak
let units = "metric"; // fahrenheit için 'imperial' yazılmalı
let lang = "en"; //Almanca için 'de' yazılacak

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

//^ Functions

const getWeatherData = async () => {
  try {
    const response = await fetch(url).then((response) => response.json()); //& fetch ile

    // console.log(response) // Api den gelen veri

    //? Data destructure

    const { main, name, weather, sys } = response; //& fetch

    // console.log(weather[0].icon)
    // const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; //^ png format
    const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`; //^ svg format

    if (cities.indexOf(name) == -1) {
      cities.unshift(name);
      console.log(cities);
      let card = `       <div class="col" id="${name}">
    <div class="card mb-4 rounded-3 shadow-sm">
            <ul class="list-unstyled mt-2 mb-4">
                <li class="text-end me-2"><i class="bi bi-x-circle"></i></li>
                <h4 class="my-0 fw-normal">${name} <span ><sup><img src="https://flagsapi.com/${
        sys.country
      }/shiny/24.png" class="rounded-circle" alt=${
        sys.country
      }/> </sup></span></h4>
                <h1 class="card-title pricing-card-title"><i class="bi bi-thermometer-half"></i> ${main.temp.toFixed(
                  0
                )}<sup>°C</sup></h1>
                <h6 class="card-title pricing-card-title">Min : ${main.temp_min.toFixed(
                  0
                )}<sup>°C</sup> - Max : ${main.temp_max.toFixed(
        0
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

      cardContainer.innerHTML = card + cardContainer.innerHTML;
    } else {
      alertMessage.textContent = `You already know the weather for ${name}, Please search for another city 😉`;
      alertMessage.classList.remove("d-none");
      setTimeout(() => {
        alertMessage.classList.add("d-none");
      }, 3000);
    }

    //! Remove Cities
    const singleClearButton = document.querySelectorAll(".bi-x-circle");

    singleClearButton.forEach((button) => {
      button.addEventListener("click", (e) => {
        const removeCard = e.target.closest(".col");
        removeCard.remove();

        delete cities[cities.indexOf(removeCard.id)];

        //^ Alternative
        // const indexToRemove = cities.findIndex((city) => city === removeCard.id);
        // if (indexToRemove !== -1) {
        //   // Using splice to remove the element from the array
        //   cities.splice(indexToRemove, 1);
        //   //   console.log(cities); // testing
        //   // OR using slice to create a new array without the removed element
        //   // cities = cities.slice(0, indexToRemove).concat(cities.slice(indexToRemove + 1));
        // }
      });
    });
  } catch (error) {
    alertMessage.textContent = "Oppps. City Not Found!";
    alertMessage.classList.remove("d-none");
    setTimeout(() => {
      alertMessage.classList.add("d-none");
    }, 3000);
  }
};
