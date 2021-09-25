import {useEffect, useState} from "react";
import axios from "axios";

const List = ({list, setSelected}) => {
  const handleClick = (event, name) => {
    event.preventDefault();
    setSelected(name);
  };

  return (
    <ul>
      {
        list.map((country) => (
          <li key={country.name}>
            {country.name}{' '}
            <button
              type='button'
              onClick={(event) => handleClick(event, country.name)}
            >Show
            </button>
          </li>
        ))
      }
    </ul>
  )
}

const Country = ({country}) => {
  //TODO: country fields
  return (
    <div>
      <h2>{country.name}</h2>
      <span>
        <p>Capital: {country.capital}</p>
      </span>
      <Weather capital={country.capital}/>
    </div>
  );
}

const Weather = ({capital}) => {
  const [ weather, setWeather] = useState({});
  const [ isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`)
      .then((response) => {
        // console.log('response', response);
        setWeather(response.data.current);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('weather api error', error);
      })
  }, []);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {
        isLoading
        ? <p>Loading...</p>
        : <span>
            <p>Temperature: {weather?.temperature} degree Celsius</p>
            <img
              src={weather?.weather_icons && weather.weather_icons[0]}
              alt={weather?.weather_descriptions && weather.weather_descriptions[0]}
            />
            <p>Wind: {weather?.wind_speed} km/h Direction: {weather?.wind_dir}</p>
          </span>
      }
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(`http://api.countrylayer.com/v2/all?access_key=${process.env.REACT_APP_COUNTRY_API_KEY}`)
      // .get('http://localhost:3001/countries')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log('country api error', error);
      });
  }, []);


  const [search, setSearch] = useState('');
  let list = search
    ? countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <>
      <div>
        <span>
          Find countries:{' '}
          <input
            value={search}
            onChange={({target}) => setSearch(target.value)}
          />
        </span>
      </div>
      {
        list.length === 1
        ? <Country country={list[0]} />
        : list.length > 10
          ? <p>Too many matches, enter more specific search key.</p>
          : <List list={list} setSelected={setSearch}/>
      }
    </>
  )
}

export default App;