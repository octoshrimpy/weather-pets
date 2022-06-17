let state
let city

class GrabWeather {
  constructor() {
    this.celsius
    this.celsiusHigh
    this.celsiusLow
    this.fahrenheit
    this.fahrenheitHigh
    this.fahrenheitLow
    this.weatherDescription
    this.city
    this.state
  }
  async fetchData(city = this.city, state = this.state) {
    try {
      let userLocation = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=c6bcf4305ed39d0237aa62d9f140df5e`
      const res = await fetch(userLocation)
      const data = await res.json()
      // console.log(data)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  makeCelsius(main) {
    let celsius = (main.temp - 273.15).toFixed()
    let celsiusHigh = (main.temp_max - 273.15).toFixed()
    let celsiusLow = (main.temp_min - 273.15).toFixed()
    // console.log("celsius: ", celsius, celsiusHigh, celsiusLow)

    return {
      current: celsius,
      high: celsiusHigh,
      low: celsiusLow
    }
  }

  makeFahrenheit(main) {
    let fahrenheit = (((main.temp - 273.15) * 9) / 5 + 32).toFixed()
    let fahrenheitHigh = (((main.temp_max - 273.15) * 9) / 5 + 32).toFixed()
    let fahrenheitLow = (((main.temp_min - 273.15) * 9) / 5 + 32).toFixed()
    // console.log("fahrenheit: ", fahrenheit, fahrenheitHigh, fahrenheitLow)

    return {
      current: fahrenheit,
      high: fahrenheitHigh,
      low: fahrenheitLow
    }
  }

  async getWeather() {
    let allData = await this.fetchData()
    this.fahrenheit = this.makeFahrenheit(allData.main)
    this.celsius = this.makeCelsius(allData.main)
    this.weatherDescription = allData.weather[0].main 
    return this
  }

  async setLocation() {
    this.state = document.querySelector("#state").value.toLowerCase()
    this.city = document.querySelector("#city").value.toLowerCase()
  }
}

let userWeather = new GrabWeather()

let getWeatherButton = document.getElementById("getWeather")

getWeatherButton.addEventListener("click", run.bind(userWeather))

window.onload = ()=>{
  run.call(userWeather)
}

function setScreenVars(weather) {
  let elm_loc = document.querySelector('.location')
  let elm_icon = document.querySelector('.icon')
  let elm_high = document.querySelector('.high')
  let elm_current = document.querySelector('.current')
  let elm_low = document.querySelector('.low')
  let elm_status = document.querySelector('.status')
}

function run() {
  
  userWeather.setLocation()
  let weather = userWeather.getWeather()
  setScreenVars(weather)
}