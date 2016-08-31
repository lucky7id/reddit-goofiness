import React from 'react';
import {connect} from 'react-redux';
import Post from '../components/post';
import {mapDispatchToProps, mapStateToProps} from '../../domain/posts';
import Waypoint from 'react-waypoint';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        //this.props.dispatch(getConfig())
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
        console.log(this, e);
    }

    render() {
        return (
            <div className="main">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {this.makePosts()}
                    <Waypoint onEnter={this.loadMore} />
                  </div>
                </div>
              </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
