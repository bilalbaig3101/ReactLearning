const CustomButton = ({onClickHandler}) => {
    return (
        <button style={style} onClick={onClickHandler}>
            Test GET
        </button>
    )
}

const style={
    fontSize:'15px',
    color: '#FFF',
    backgroundColor: '#56AA1C',
    border: '1px solid #2B9B1B',
    borderRadius:'5px',
    padding: '8px 16px'
}


export default (CustomButton)