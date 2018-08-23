import React from 'react';
import './Input.css'

const input = (props) => {
    const classes = []
    if (props.invalid==='true') {
        classes.push('Invalid')

    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            <input className={classes.join('')} type="text" {...props} />
            
            {props.invalid==='true' && props.label === 'published date' &&
                <div className="ValidationError">
                    Please fill a valid {props.label} format dd/mm/yyyy</div>}

            {props.invalid==='true' && props.label !== 'published date' &&
                <div className="ValidationError">
                    Please fill a valid {props.label}</div>}
        </div>
    )
}

export default input