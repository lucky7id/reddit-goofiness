import React from 'react';
import {connect} from 'react-redux';
import Post from '../components/post';
import {mapDispatchToProps, mapStateToProps} from '../../domain/posts';
import Waypoint from 'react-waypoint';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        this.props.requestPosts('frontpage');
        this.loadMore = this.loadMore.bind(this);
    }

    makePosts() {
        return this.props.posts.map(post => {
            return <Post
                body={post}
                key={post.data.id}
                select={this.props.selectPost}
                selected={this.props.selected}
            />
        })
    }

    loadMore(e) {
        this.props.loadMore();
    }

    render() {
        return (
            <div className="main">
              <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li><a href="#">Top</a></li>
                      <li><a href="#">Hot</a></li>
                      <li><a href="#">New</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {this.makePosts()}
                    {this.props.posts.length && <Waypoint onEnter={this.loadMore} />}
                  </div>
                </div>
              </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
