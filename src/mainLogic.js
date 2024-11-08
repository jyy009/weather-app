import { format, fromUnixTime } from "date-fns";

export const mainLogic = () => {
  const apiKey = process.env.API_KEY;
  let location = "stockholm";
  let isLoading = false;
  const BASE_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

  const weatherContainer = document.getElementById("weather-container");
  const currentWeatherTemplate = document.getElementById(
    "current-weather-template"
  );
  const searchInput = document.getElementById("search-input");
  const locationForm = document.getElementById("location-form");
  const cloneCurrentWeatherTemplate =
    currentWeatherTemplate.content.cloneNode(true);
  weatherContainer.appendChild(cloneCurrentWeatherTemplate);

  const fetchData = async () => {
    const weatherUrl = `${BASE_URL}/${location}/2024-11-08/2024-11-13?unitGroup=us&key=${apiKey}`;
    try {
      isLoading = true;

      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("raw data from API", data);
      isLoading = false;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const processData = async () => {
    isLoading = true;
    const data = await fetchData();
    if (!data) {
      throw new Error("Failed to fetch data");
    }

    console.log(
      data.address,
      data.currentConditions.temp,
      data.currentConditions.conditions,
      data.currentConditions.icon,
      data.days[0].tempmax,
      data.days[0].tempmin
    );
    isLoading = false;
    return {
      location: data.address,
      temp: data.currentConditions.temp,
      condition: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
      high: data.days[0].tempmax,
      low: data.days[0].tempmin,
      date: data.days[0].datetimeEpoch,
      forecastDays: data.days,
    };
  };

  const setLocation = (value) => {
    location = value;
    console.log("current location set to:", location);
  };

  const clearSearchInput = () => {
    const searchInput = document.getElementById("search-input");
    searchInput.value = "";
  };

  const displayWeatherData = async () => {
    const data = await processData();

    const locationH2 = document.getElementById("current-location");
    locationH2.textContent = data.location;

    const tempH2 = document.getElementById("current-temp");
    tempH2.textContent = data.temp;

    const condition = document.getElementById("current-condition");
    condition.textContent = data.condition;

    const icon = document.getElementById("current-icon");
    icon.textContent = data.icon;

    const high = document.getElementById("current-high");
    high.textContent = data.high;

    const low = document.getElementById("current-low");
    low.textContent = data.low;
  };

  const handleSearchButton = async (e) => {
    e.preventDefault();
    await processData();

    const value = searchInput.value;
    console.log("form value", value);
    setLocation(value);
    await displayWeatherData();
    await displayForecastData()
    clearSearchInput();
  };

  locationForm.addEventListener("submit", (e) => {
    handleSearchButton(e);
  });

  const displayForecastData = async () => {
    const forecastTemplate = document.getElementById("forecast-template");
    const cloneForecastTemplate = forecastTemplate.content.cloneNode(true);
    weatherContainer.appendChild(cloneForecastTemplate);

    const data = await processData();
    const todayEpochTime = data.date;
    const todayDate = fromUnixTime(todayEpochTime);
    const formattedTodayDate = format(todayDate, "yyyy-MM-dd");
    console.log(formattedTodayDate);

    const forecastDaysList = data.forecastDays;
    console.log(forecastDaysList);
    const dailyTempsList = {};

    forecastDaysList.forEach((day) => {
      const date = day.datetime;
      console.log(date);

      if (date !== formattedTodayDate) {
        const maxTemp = Math.round(day.tempmax);
        const minTemp = Math.round(day.tempmin);
        console.log("min temp:", minTemp, "max temp:", maxTemp);

        dailyTempsList[date] = { minTemp, maxTemp };
        console.log(dailyTempsList);
      //   const minTempSpan = document.getElementById("min-temp");
      // const maxTempSpan = document.getElementById("max-temp");
      // minTempSpan.innerHTML = minTemp;
      // maxTempSpan.textContent = maxTemp;
      }


    });

    for (const date in dailyTempsList) {
      const weekdayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      });
      console.log(weekdayName);
      const minT = dailyTempsList[date].minTemp;
      const maxT = dailyTempsList[date].maxTemp;
      console.log(minT, maxT);
      const minTempSpan = document.getElementById("min-temp");
      const maxTempSpan = document.getElementById("max-temp");
      minTempSpan.textContent = minT;
      maxTempSpan.textContent = maxT;

      const forecastDaySpan = document.getElementById("forecast-day")
      forecastDaySpan.textContent = weekdayName
      }
    }

    displayWeatherData();
    displayForecastData();

  };
  // displayWeatherData();

  // return { fetchData, processData };

