import React from 'react'
const ResponseRegion = ({ data }) => {
    return (
        <div className="response-area" style={style}>
            {
                data === null ?
                    (
                        <h3 style={{ textAlign: 'center'}}>
                            :( No Data
                        </h3>
                    )
                    :
                    (
                        <pre>{data}</pre>
                    )
            }
        </div>
    )
}

const style = {
    height: '30vh',
    margin: '15px 0', 
    overflow: 'auto', 
    borderRadius: '5px',
    fontSize:'15px'
}

export default (ResponseRegion)