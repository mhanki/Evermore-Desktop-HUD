import React, {useState, useEffect} from 'react'
import API_KEY from './config.js'

const Weather = ({city}) => {
  let lat = 39.7 //50.1
  let lon = -105 //8.2
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  const [weather, setWeather] = useState()
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    let data = require('./onecall.json')
    //setWeather(data)
    const fetchData = async () => {
      try {
        const response = await fetch(url)

        if (response.status === 200) {
          const data = await response.json()
          setWeather(data)
        } else {
          console.error(`Error ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error ${error}`);
      }
    }

    if(!fetched){
      fetchData()
      setFetched(true)
    } else {
      setInterval(fetchData, 3600000)
    }
  // eslint-disable-next-line
  }, [fetched])

  const getDetails = (code) => {
    const images = require.context('./assets/icons', true)
    let url = ''
    let text = ''

    switch (true) {
      case ['mostly_clear', 'clear'].includes(code):
        url = './sun.png'
        text = 'Clear Sky'
        break
      case ['cloudy', 'mostly_cloudy'].includes(code):
        url = './clouds.png'
        text = 'Cloudy'
        break
      case ['broken clouds', 'partly_cloudy'].includes(code):
        url = './clouds.svg' //'./partly-cloudy.png'
        text = 'Partly Cloudy'
        break
      case ['fog_light', 'fog', 'mist'].includes(code):
        url = './haze.png'
        text = 'Fog'
        break
      case ['rain_heavy', 'rain'].includes(code):
        url = './rain.png'
        text = 'Rain'
        break
      case ['light rain', 'rain_light', 'drizzle'].includes(code):
        url = './rain-cloud.png'
        text = 'Light Rain'
        break
      case code === 'tstorm':
        url = './storm.png'
        text = 'Thunderstorm'
        break
      case ['snow_heavy', 'snow'].includes(code):
        url = './snow.png'
        text = 'Snow'
        break
      case ['snow_light', 'flurries'].includes(code):
        url = './light-snow.png'
        text = 'Light Snow'
        break
      case [
        'freezing_rain_heavy', 'freezing_rain', 'freezing_rain_light', 'freezing_drizzle', 
        'ice_pellets_heavy', 'ice_pellets', 'ice_pellets_light'
      ].includes(code):
        url = './hail.png'
        text = 'Hail'
        break
      default:
        console.log('Error: Missing weather code')
        break
    }

    let obj = {
      img: images(url),
      text: text
    }
  
    return obj
  }

  return (
    <div>
      {weather 
       ? <div className="weather">
          <div className="weather--title">
            <p className="weather--city">{city}</p>
            <img className="weather--icon" alt={weather.current.weather[0].description} src={getDetails(weather.current.weather[0].description).img.default}/>
          </div>
          <p className="weather--info">{getDetails(weather.current.weather[0].description).text}</p>
          <p className="weather--temp">{Math.round(weather.current.temp)} °C</p>
         </div>
       : <p>loading...</p>}
    </div>
  )
}

export default Weather