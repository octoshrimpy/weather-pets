let state
let city

class GrabWeather {
    constructor(){
        this.celsius 
        this.celsiusHigh
        this.celsiusLow
        this.fahrenheit
        this.fahrenheitHigh
        this.fahrenheitLow
    }
    async fetchData(){
        try {
            let userLocation = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=c6bcf4305ed39d0237aa62d9f140df5e`
            const res = await fetch(userLocation)
            const data = await res.json()
            console.log(data)
            return data
            // return ((await fetch(userLocation)).json())
        } catch (error) {
            console.log(error)
        }
    }

    async makeCelsius(){
        let allData = await this.fetchData()
        this.celsius = (allData.main.temp -273.15).toFixed()
        this.celsiusHigh = (allData.main.temp_max -273.15).toFixed()
        this.celsiusLow = (allData.main.temp_min -273.15).toFixed()
        console.log('celsius: ',this.celsius, this.celsiusHigh, this.celsiusLow)
    }

    async makeFahrenheit(){
        let allData = await this.fetchData()
        this.fahrenheit = (((allData.main.temp - 273.15) * 9 / 5) + 32).toFixed()
        this.fahrenheitHigh = (((allData.main.temp_max - 273.15) * 9 / 5) + 32).toFixed()
        this.fahrenheitLow = (((allData.main.temp_min - 273.15) * 9 / 5) + 32).toFixed()
        console.log('fahrenheit: ',this.fahrenheit, this.fahrenheitHigh, this.fahrenheitLow)
    }

    setLocation(){
        state = document.querySelector('#state').value.toLowerCase()
        city = document.querySelector('#city').value.toLowerCase()
        userWeather.makeCelsius()
        userWeather.makeFahrenheit()

    }
}

let userWeather = new GrabWeather

let getWeatherButton = document.getElementById("getWeather")

getWeatherButton.addEventListener('click', userWeather.setLocation);
