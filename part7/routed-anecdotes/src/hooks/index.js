import {useDebugValue, useState} from "react";

export const useField = (name, type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  useDebugValue(name ? name : 'field')
  return {
    name,
    type,
    value,
    onChange,
    reset: () => setValue('')
  }
}