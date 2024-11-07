export const mainLogic = () => {
  const apiKey = process.env.API_KEY;
  let location = "stockholm";
  let isLoading = false;
  const BASE_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

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
    const weatherUrl = `${BASE_URL}/${location}/?key=${apiKey}`;
    try {
      isLoading = true;
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("raw data from API", data);
      isLoading = false
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const processData = async () => {
    isLoading = true
    const data = await fetchData();
    if (!data) {
      throw new Error("Failed to fetch data");
    }

    console.log(
      data.address,
      data.currentConditions.temp,
      data.currentConditions.uvindex,
      data.currentConditions.conditions
    );
    isLoading = false
    return {
      location: data.address,
      temp: data.currentConditions.temp,
      condition: data.currentConditions.conditions,
      high: data.days[0].tempmax,
      low: data.days[0].tempmin,
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
    clearSearchInput();
  };

  locationForm.addEventListener("submit", (e) => {
    handleSearchButton(e);
  });

  displayWeatherData();
};
