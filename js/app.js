
const API_KEY = 'drzcFViA5O6ndhvGY3mYN5Z84Z6Z9gghzEbcVln1'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`


const currentDayMars = document.querySelector('.currentDayMars')
const currentDayEarth = document.querySelector('.currentDayEarth')
const currentWindSpeed = document.querySelector('.windspeed')
const temp = document.querySelector('.weather')
const minWeather = document.querySelector('.minWeather')
const maxWeather = document.querySelector('.maxWeather')

let weatherOfTheDayId

getData().then(sols => {
    weatherOfTheDayId = sols.length - 1
    displayWeatherOfTheDay(sols)
})

function displayWeatherOfTheDay(sols) {
    const weatherOfTheDay = sols[weatherOfTheDayId]
    currentDayMars.innerText = weatherOfTheDay.sol
    currentDayEarth.innerText = displayDate(weatherOfTheDay.date)
    temp.innerText = weatherOfTheDay.temp
    minWeather.innerText = weatherOfTheDay.minTemp
    maxWeather.innerText = weatherOfTheDay.maxTemp
    currentWindSpeed.innerText = weatherOfTheDay.windSpeed

}

function displayDate(date) {
    return date.toLocaleDateString(
        undefined,
        { day: 'numeric', month: 'long' }
    )

}

function getData() {
    return fetch(API_URL)
        //convertir notre résultat en json
        .then(res => res.json())
        .then(data => {
            // découper nos données en plusieurs  variables
            const {
                sol_keys,
                validity_checks,
                //tout le reste
                ...solData
            } = data
            //on stocke dans un objet les données dispo pour chaque jour
            //on map les propriété de chaques solData (jour sur mars)
            //la première valeur est la clé (jour sol), la deuxieme valeur c'est tout le contenu data
            return Object.entries(solData).map(([sol, data]) => {
                return {
                    sol: sol,
                    temp: data.AT?.av,
                    maxTemp: data.AT?.mx,
                    minTemp: data.AT?.mn,
                    windSpeed: data.HWS?.av,
                    date: new Date(data.First_UTC)
                }
            })
        })
}

