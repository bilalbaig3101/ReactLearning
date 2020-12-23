import React from 'react';

const CodeSnippet = ({text}) => {
    return (
        <span style={style}>
            {text}
        </span>
    )
}
const style={
    color: '#E74C3C',
    backgroundColor: '#F9EBEA',
    padding: '2px 5px',
    borderRadius:'5px'
}
export default (CodeSnippet)