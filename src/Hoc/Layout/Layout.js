import React, { Component } from 'react';
import './Layout.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faFeatherAlt, faTrashAlt, faEdit, faBarcode, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendarAlt, faFeatherAlt, faTrashAlt, faEdit, faBarcode, faPlus)

class Layout extends Component {


    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <main className="Content Container">
                   {this.props.children}
                </main>
            </React.Fragment>

        )
    }

}

export default Layout;