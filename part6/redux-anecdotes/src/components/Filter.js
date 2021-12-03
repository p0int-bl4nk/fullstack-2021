import React from 'react'
import {useDispatch} from "react-redux";
import {actionSetFilter} from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    dispatch(actionSetFilter(target.value?.toLowerCase()));
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

export default Filter