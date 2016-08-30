import {getConfig} from '../domain/search';
import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(getConfig())
    }

    render() {
        return (
            <div>
                hello!
            </div>
        )
    }
}


export default connect()(App);
