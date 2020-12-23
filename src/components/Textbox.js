import React from 'react';

const Textbox = ({ id, placeholder, value, handleOnChange }) => {
    return (
        <input
            style={style}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
        />
    )
}

const style = {
    fontSize: '15px',
    border: '1px solid #C7CCD1',
    borderRadius: '5px',
    padding: '8px 16px'
}

export default (Textbox);