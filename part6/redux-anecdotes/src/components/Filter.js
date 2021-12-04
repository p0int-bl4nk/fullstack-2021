import React from 'react'
import {connect} from "react-redux";
import {actionSetFilter} from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = ({ target }) => {
    props.actionSetFilter(target.value?.toLowerCase())
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

const mapDispatchToProps = { actionSetFilter }

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter);

export default ConnectedFilter