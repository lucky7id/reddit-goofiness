import React from 'react';
import {connect} from 'react-redux';

export default class SelfPost extends React.Component {

    constructor(props) {
        super(props);
    }

    content() {}

    render() {
        return (
            <div>
                {this.content()}
            </div>
        )
    }
}
