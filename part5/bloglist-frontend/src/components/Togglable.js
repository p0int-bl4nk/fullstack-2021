import React, {useImperativeHandle, useState} from "react";

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = {display: visible ? 'none' : ''};
  const showWhenVisible = {display: visible ? '' : 'none'};

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  });

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
          Cancel
        </button>
      </div>
    </>
  )
});

export default Togglable;