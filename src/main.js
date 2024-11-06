
// fetch the data

export const main = () => {
  const apiKey = process.env.API_KEY;
  let location = "stockholm"
  const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
  const weatherUrl = `${BASE_URL}/${location}/?key=${apiKey}`

  const fetchData = async () => {
    try {
      const response = await fetch(weatherUrl)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const result = await response.json()
      console.log(result)
    } catch (error){
      console.error(error.message)
    }
  }

  fetchData()
}

