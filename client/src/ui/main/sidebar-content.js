import React from 'react';
import {connect} from 'react-redux';

class SidebarContent extends React.Component {

    constructor(props) {
        super(props);
        //this.props.dispatch(getConfig())
    }

    render() {
        return (
            <div className="sidebar-content"></div>
        )
    }
}


export default connect()(SidebarContent);
