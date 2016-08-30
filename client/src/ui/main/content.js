import React from 'react';
import {connect} from 'react-redux';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        //this.props.dispatch(getConfig())
    }

    render() {
        return (
            <div className="main">
                sidebar
            </div>
        )
    }
}


export default connect()(MainContent);
