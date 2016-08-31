import React from 'react';
import {connect} from 'react-redux';

export default class Embed extends React.Component {
    constructor(props) {
        super(props);
        this.props.isLoading(true);
        this.loaded = this.loaded.bind(this);
    }

    componentWillUnmount() {
        this.props.isLoading(true);
    }

    loaded (e) {
        this.props.isLoading(false);
    }

    render() {
        return (
            <iframe className={this.props.loadingState ? 'loading' : 'loaded'} src={this.props.post.data.url} onLoad={this.loaded}></iframe>
        )
    }
}
