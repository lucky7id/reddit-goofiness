//import {getConfig} from '../domain/search';
import React from 'react';
import {connect} from 'react-redux';
import SidebarLeft from './main/sidebar-left';
import MainContent from './main/content';
import SidebarContent from './main/sidebar-content';
import {mapDispatchToProps} from '../domain/main';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.props.appLoad();
    }

    render() {
        return (
            <div>
                <SidebarLeft />
                <SidebarContent />
                <MainContent />

            </div>
        )
    }
}


export default connect(null, mapDispatchToProps)(App);
