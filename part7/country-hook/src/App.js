import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [isFetching, setIsFetching] = useState(null);

  useEffect(() => {
    if (!name) return null;
    setIsFetching(true)
    axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then((response) => {
        if (response.data.length)
          setCountry({ data: response.data[0], found: true })
        else
          setCountry({ found: false })
      })
      .catch(e => console.log('country api error:', e))
      .finally(() => setIsFetching(false));
  }, [name]);

  return { country, isFetching }
}

const Country = ({ country, isFetching }) => {
  if (isFetching)
    return <h4>Loading...</h4>

  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <h4>
        not found...
      </h4>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { country, isFetching } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  console.log('country', country)
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} isFetching={isFetching} />
    </div>
  )
}

export default App
