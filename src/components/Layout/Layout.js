import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Modal  from "../UI/Modal/Modal"

class Layout extends Component {
 
    render () {
        return (
            <div>
                <Modal></Modal>
                <Toolbar/>
                <main >
                    {this.props.children}
                </main>
                
            </div>
        )
    }
}
export default Layout;