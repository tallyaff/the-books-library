import React from 'react';
import Button from '../UI/Button/Button'
import './RemoveBookMsg.css'

const removeBookMsg = (props) => {
    return (
        <React.Fragment>
            <div className="RemoveBookMsg">Are you sure that you want to delete this book?</div>
            <Button btnType="Danger" clicked={props.btnCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.btnRemove}>YES</Button>
        </React.Fragment>
    )
}

export default removeBookMsg;