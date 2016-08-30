//import {getConfig} from '../domain/search';
import React from 'react';
import {connect} from 'react-redux';
import SidebarLeft from './main/sidebar-left';
import MainContent from './main/content';
import SidebarContent from './main/sidebar-content';

class App extends React.Component {

    constructor(props) {
        super(props);
        //this.props.dispatch(getConfig())
    }

    render() {
        return (
            <div>
                <SidebarLeft />
                <MainContent />
                <SidebarContent />
            </div>
        )
    }
}


export default connect()(App);
