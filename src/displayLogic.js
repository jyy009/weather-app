// import { mainLogic } from "./mainLogic";

// export const displayLogic = () => {
//   mainLogic();
//   const { processData, handleSearchButton } = mainLogic();

//   const weatherContainer = document.getElementById("weather-container");

//   const currentWeatherTemplate = document.getElementById(
//     "current-weather-template"
//   );
//   const cloneCurrentWeatherTemplate =
//     currentWeatherTemplate.content.cloneNode(true);
//   weatherContainer.appendChild(cloneCurrentWeatherTemplate);

//   const displayWeatherData = async () => {
//     const data = await processData();

//     const locationH2 = document.getElementById("current-location");
//     locationH2.textContent = data.location;

//     const tempH2 = document.getElementById("current-temp");
//     tempH2.textContent = data.temp;

//     const condition = document.getElementById("current-condition");
//     condition.textContent = data.condition;

//     const high = document.getElementById("current-high");
//     high.textContent = data.high;

//     const low = document.getElementById("current-low");
//     low.textContent = data.low;
//   }


// };
