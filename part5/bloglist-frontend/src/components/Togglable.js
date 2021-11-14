import React, { useImperativeHandle, useState } from 'react'
import * as propTypes from 'prop-types'

const Togglable = React.forwardRef(({ buttonLabel, children, closeButtonLabel = 'Cancel' }, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button type='button' onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type='button' onClick={toggleVisibility}>
          {closeButtonLabel}
        </button>
      </div>
    </>
  )
})


Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
  closeButtonLabel: propTypes.string,
}

export default Togglable