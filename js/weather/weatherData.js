class GrabWeather {
  constructor() {
	this.celsius
	this.celsiusHigh
	this.celsiusLow
	this.fahrenheit
	this.fahrenheitHigh
	this.fahrenheitLow
	this.weatherDescription
	this.postalCode
	this.ForecastFahrenheit
	this.ForecastCelsius
	this.dates
  }
  async fetchData(postalCode = this.postalCode) {
		try {
			let userLocation = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${postalCode}?key=YXWPLDZGSKX4ADNA8NBSEYL8R`
			const res = await fetch(userLocation)
			const data = await res.json()
			console.log(data)
			return data
		} catch (error) {
			//if no location found, print err message to user to try again
			alert('please enter a valid postal code')
			console.error(error)
		}
  }

  makeCelsius(main) {
		let celsius        = ((main.currentConditions.temp- 32) * 5/9).toFixed()
		let celsiusHigh    = ((main.days[0].tempmax - 32) * 5/9).toFixed()
		let celsiusLow     = ((main.days[0].tempmin - 32) * 5/9).toFixed()
		// console.log("celsius: ", celsius, celsiusHigh, celsiusLow)

		return {
			current: celsius,
			high: celsiusHigh,
			low: celsiusLow
		}
  }

  makeFahrenheit(main) {
		let fahrenheit       = main.currentConditions.temp.toFixed()
		let fahrenheitHigh   = main.days[0].tempmax.toFixed()
		let fahrenheitLow    = main.days[0].tempmin.toFixed()
		// console.log("fahrenheit: ", fahrenheit, fahrenheitHigh, fahrenheitLow)

		return {
			current: fahrenheit,
			high: fahrenheitHigh,
			low: fahrenheitLow
		}
  }

	getDate(main){
		let dateToday = main.days[0].datetime
		let date2 = main.days[1].datetime
		let date3 = main.days[2].datetime
		let date4 = main.days[3].datetime
		let date5 = main.days[4].datetime
		return {
			dateToday: dateToday,
			date2: date2,
			date3: date3,
			date4: date4,
			date5: date5
		}
	}

	getForecastFahrenheit(main){
		let day2        = Math.round(main.days[1].temp)
		let day2High    = Math.round(main.days[1].tempmax)
		let day2Low     = Math.round(main.days[1].tempmin)
		let day3        = Math.round(main.days[2].temp)
		let day3High    = Math.round(main.days[2].tempmax)
		let day3Low     = Math.round(main.days[2].tempmin)
		let day4        = Math.round(main.days[3].temp)
		let day4High    = Math.round(main.days[3].tempmax)
		let day4Low     = Math.round(main.days[3].tempmin)
		let day5        = Math.round(main.days[5].temp)
		let day5High    = Math.round(main.days[5].tempmax)
		let day5Low     = Math.round(main.days[5].tempmin)
		return {
			day2: day2,
			day2High: day2High,
			day2Low: day2Low,
			day3: day3,
			day3High: day3High,
			day3Low: day3Low,
			day4: day4,
			day4High: day4High,
			day4Low: day4Low,
			day5: day5,
			day5High: day5High,
			day5Low: day5Low
		}
	}

	getForecastCelsius(main){
		let day2        = Math.round((main.days[1].temp -32) * 5/9)
		let day2High    = Math.round((main.days[1].tempmax -32) * 5/9)
		let day2Low     = Math.round((main.days[1].tempmin -32) * 5/9)
		let day3        = Math.round((main.days[2].temp -32) * 5/9)
		let day3High    = Math.round((main.days[2].tempmax -32) * 5/9)
		let day3Low     = Math.round((main.days[2].tempmin -32) * 5/9)
		let day4        = Math.round((main.days[3].temp -32) * 5/9)
		let day4High    = Math.round((main.days[3].tempmax -32) * 5/9)
		let day4Low     = Math.round((main.days[3].tempmin -32) * 5/9)
		let day5        = Math.round((main.days[4].temp -32) * 5/9)
		let day5High    = Math.round((main.days[4].tempmax -32) * 5/9)
		let day5Low     = Math.round((main.days[4].tempmin -32) * 5/9)
		return {
			day2: day2,
			day2High: day2High,
			day2Low: day2Low,
			day3: day3,
			day3High: day3High,
			day3Low: day3Low,
			day4: day4,
			day4High: day4High,
			day4Low: day4Low,
			day5: day5,
			day5High: day5High,
			day5Low: day5Low
		}
	}

  async getWeather() {
		let allData = await this.fetchData()
		this.fahrenheit = this.makeFahrenheit(allData)
		this.celsius = this.makeCelsius(allData)
		this.weatherDescription = allData.description
		this.ForecastFahrenheit = this.getForecastFahrenheit(allData)
		this.ForecastCelsius = this.getForecastCelsius(allData)
		this.dates = this.getDate(allData)
		console.log('this',this)
		return this
  }

  async setLocation() {
		this.postalCode = document.querySelector("#postalCode").value.toLowerCase()
  }
}

let userWeather = new GrabWeather()

let getWeatherButton = document.getElementById("getWeather")

getWeatherButton.addEventListener("click", run.bind(userWeather))

function showAllData(){
  run.call(userWeather)
}

window.onload = showAllData()

function setScreenVars(weather) {
  let elm_loc = document.querySelector('.location')
  let elm_icon = document.querySelector('.icon')
  let elm_high = document.querySelector('.high')
  let elm_current = document.querySelector('.current')
  let elm_low = document.querySelector('.low')
  let elm_description = document.querySelector('.description')
	let day2 = document.querySelector('.day2')
	let day2High = document.querySelector('.day2High')
	let day2Low = document.querySelector('.day2Low')
	let day3 = document.querySelector('.day3')
	let day3High = document.querySelector('.day3High')
	let day3Low = document.querySelector('.day3Low')
	let day4 = document.querySelector('.day4')
	let day4High = document.querySelector('.day4High')
	let day4Low = document.querySelector('.day4Low')
	let day5 = document.querySelector('.day5')
	let day5High = document.querySelector('.day5High')
	let day5Low = document.querySelector('.day5Low')
	let currentDate = document.querySelector('.currentDate')
	let date2 = document.querySelector('.date2')
	let date3 = document.querySelector('.date3')
	let date4 = document.querySelector('.date4')
	let date5 = document.querySelector('.date5')
	currentDate.innerText = weather.dates.dateToday
	date2.innerText = weather.dates.date2
	console.log(weather.dates.date3)
	date3.innerText = weather.dates.date3
	date4.innerText = weather.dates.date4
	date5.innerText = weather.dates.date5

	if(document.querySelector('#fahrRadio').checked){
		elm_current.innerText = weather.fahrenheit.current
		elm_high.innerText = weather.fahrenheit.high
		elm_low.innerText = weather.fahrenheit.low
		elm_description.innerText = weather.weatherDescription
		day2.innerText = weather.ForecastFahrenheit.day2
		day2High.innerText = weather.ForecastFahrenheit.day2High
		day2Low.innerText = weather.ForecastFahrenheit.day2Low
		day3.innerText = weather.ForecastFahrenheit.day3
		day3High.innerText = weather.ForecastFahrenheit.day3High
		day3Low.innerText = weather.ForecastFahrenheit.day3Low
		day4.innerText = weather.ForecastFahrenheit.day4
		day4High.innerText = weather.ForecastFahrenheit.day4High
		day4Low.innerText = weather.ForecastFahrenheit.day4Low
		day5.innerText = weather.ForecastFahrenheit.day5
		day5High.innerText = weather.ForecastFahrenheit.day5High
		day5Low.innerText = weather.ForecastFahrenheit.day5Low
	}else if(document.querySelector('#celRadio').checked){
		elm_current.innerText = weather.celsius.current
		elm_high.innerText = weather.celsius.high
		elm_low.innerText = weather.celsius.low
		elm_description.innerText = weather.weatherDescription
		day2.innerText = weather.ForecastCelsius.day2
		day2High.innerText = weather.ForecastCelsius.day2High
		day2Low.innerText = weather.ForecastCelsius.day2Low
		day3.innerText = weather.ForecastCelsius.day3
		day3High.innerText = weather.ForecastCelsius.day3High
		day3Low.innerText = weather.ForecastCelsius.day3Low
		day4.innerText = weather.ForecastCelsius.day4
		day4High.innerText = weather.ForecastCelsius.day4High
		day4Low.innerText = weather.ForecastCelsius.day4Low
		day5.innerText = weather.ForecastCelsius.day5
		day5High.innerText = weather.ForecastCelsius.day5High
		day5Low.innerText = weather.ForecastCelsius.day5Low
	}

}

async function run() {
  userWeather.setLocation()
  let weather = await userWeather.getWeather()
  setScreenVars(weather)
}


