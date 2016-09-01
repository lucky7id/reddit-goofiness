import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../../domain/content-sidebar';
import SelfPost from '../components/self-post';
import Embed from '../components/embed';

class SidebarContent extends React.Component {

    constructor(props) {
        super(props);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.state = {
            isExpanded: false
        }
    }

    toggleExpanded(e) {
        e.preventDefault();
        this.setState({isExpanded: !this.state.isExpanded})
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
            <div className={`sidebar-content ${this.state.isExpanded ? 'expanded' : ''}`}>
              <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li onClick={this.toggleExpanded}>
                        <a href="#">
                        {this.state.isExpanded ?
                          <i className="material-icons">close</i> :
                          <i className="material-icons">arrow_back</i>
                        }
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              {this.content()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
