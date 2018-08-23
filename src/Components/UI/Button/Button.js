import React from 'react';
import './Button.css'

const button = (props) => {

    return (
        <React.Fragment>
            <button
                className={`Button ${props.btnType}`}
                onClick={props.clicked}>{props.children}
            </button>
        </React.Fragment>
    )
}

export default button;