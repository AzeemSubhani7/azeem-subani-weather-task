import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ErrorComponent from './Error';

const App = () => {
  const [api, setApi] = useState('');
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState('')

  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  // useEffect for getting coordinates
  useEffect(() => {
    setApi('0577ab9aad66e70a7e9ccee189033593')
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  },[latitude, longitude])

  // useEffect for fetching data
  useEffect(() => {
    const fetchWeather = async () => {
      setError(false)
      try{
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`)
        setResponse(weatherResponse.data)
        if(!weatherResponse.data) {
          setError(true)
        }
      }
      catch(error){
        console.log(error)
        setError(true)
      }
    }
    fetchWeather();
  },[error, api, latitude, longitude])

  // useEffect for getting user local time
  useEffect(() => {
    setDate(new Date().toLocaleDateString())
    setTime(new Date().toLocaleTimeString())
    console.log("time stamp",time)
  },[date, time])


  if(error) {
    return(
      <ErrorComponent />
    )
  }

  return(
    <div className="p-10  ">
      <div className="bg-gradient-to-br from-gray-200 p-5 via-cyan-100 flex-col space-y-2 to-green-200 h-80 rounded-lg flex items-center">
        <h1 className="font-light text-2xl text-cyan-600 text-center" >Current Time: {response.name ? response.name : setError(true)}</h1>
        <h1 className="font-light text-2xl text-cyan-600 text-center" >Current Time: {time}</h1>
        <h1 className="font-light text-2xl text-cyan-600 text-center" >Current Date: {date}</h1>
        <h1 className="font-light text-2xl text-cyan-600 text-center" >Current Temprature: {response ? Math.round(response.main.temp - 273) : setError(true)} &deg;C</h1>
        <h1 className="font-light text-2xl text-cyan-600 text-center" >Maximun Temprature: {response ? Math.round(response.main.temp_max - 273): setError(true)} &deg;C</h1>
        <h1 className="font-light text-2xl text-cyan-600 text-center" >Minimum Temprature: {response ? Math.round(response.main.temp_min - 273): setError(true)} &deg;C</h1>
        <h1 className="font-light text-2xl text-cyan-600 text-center" >Feels Like: {response ? Math.round(response.main.feels_like - 273): setError(true)} &deg;C</h1>
      </div>
    </div>
  )
}

export default App;