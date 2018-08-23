import React, { Component } from 'react';
import './Modal.css'

class Modal extends Component {

    render() {
        return (
            <div>
                <div className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateX(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </div>

        )
    }
}

export default Modal;