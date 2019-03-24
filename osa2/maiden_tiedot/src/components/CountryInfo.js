import React, {useState, useEffect} from 'react'
import config from '../config'
import axios from 'axios'


const CountryInfo = ({country}) => {
  const apikey = config.apikey
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios.get(`http://api.apixu.com/v1/current.json?key=${apikey}&q=${country.capital}`)
      .then((response) => setWeather(response.data))
      .catch(error => console.log(error));
  }, []);

  const curr = weather ? weather.current : null

  return (  
    <div>
      <h1>{country.name}</h1>

      Capital: {country.capital}<br/>
      Population: {country.population}

      <h2>Languages:</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul><br/>
      <img src={country.flag} alt="flag" width="200"/>
      
      <h2>Weather in {country.capital}</h2>
      {curr && 
      <div>
        <b>temperature:</b> {curr.temp_c} Celsius<br/>
        <img src={curr.condition.icon} alt="weather icon" /><br/>
        <b>wind:</b> {curr.wind_kph} kph direction {curr.wind_dir}
      </div>}
    </div>
  )
}

export default CountryInfo