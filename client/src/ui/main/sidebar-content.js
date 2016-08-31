import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../../domain/content-sidebar';
import SelfPost from '../components/self-post';
import Embed from '../components/embed';

class SidebarContent extends React.Component {

    constructor(props) {
        super(props);
    }

    content() {
        if (!this.props.selected) return;
        const isSelfPost = this.props.selected.data.is_self;

        return isSelfPost ?
            <SelfPost post={this.props.selected} isLoading={this.props.contentLoading}/> :
            <Embed post={this.props.selected} loadingState={this.props.contentBar.isLoading} isLoading={this.props.contentLoading}/>
    }

    render() {
        return (
            <div className="sidebar-content">
                {this.content()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
