// fetch the data

export const main = () => {
  const apiKey = process.env.API_KEY;
  let location = "stockholm";
  const BASE_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";


  const fetchData = async () => {
    const weatherUrl = `${BASE_URL}/${location}/?key=${apiKey}`;
    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const data = await response.json();
      console.log("raw data from API", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };


  const processData = async () => {
    const data = await fetchData();
    console.log("data from fetch", data);
    console.log(data.currentConditions.temp,data.currentConditions.uvindex, data.currentConditions.conditions)
    return {
      temp: data.currentConditions.temp,
      uv: data.currentConditions.uvindex,
      condition: data.currentConditions.conditions,
    };
  };

  const setLocation = (value) => {
    location = value
    console.log("current location set to:", location)
  }

  const handleSearchButton = (e) => {
    e.preventDefault();

    const searchInput = document.getElementById("search-input")
    const value = searchInput.value;
    console.log("form value", value);
    setLocation(value)
    processData()    
  };

  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", (e) => {
    handleSearchButton(e)
  });

  processData()
}
