import React from 'react';
import {connect} from 'react-redux';

class SidebarLeft extends React.Component {

    constructor(props) {
        super(props);
        //this.props.dispatch(getConfig())
    }

    render() {
        return (
            <div className="sidebar-left"></div>
        )
    }
}


export default connect()(SidebarLeft);
