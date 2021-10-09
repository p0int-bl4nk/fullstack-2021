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
  return (
    <div>
      <h2>{country.name}</h2>
      <span>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      </span>
      <h3>Languages</h3>
      <ul>
        {
          country.languages.map((lang, index) => <li key={index}>{lang.name}</li>)
        }
      </ul>
      <img
        src={country.flag}
        alt={country.name}
        width={120}
        height={80}
      />
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
  }, [capital]);

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
      .get(`https://restcountries.com/v2/all`)
      .then((response) => {
        // console.log('response', response);
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