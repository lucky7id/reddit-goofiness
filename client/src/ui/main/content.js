import React from 'react';
import {connect} from 'react-redux';
import Post from '../components/post';
import {mapDispatchToProps, mapStateToProps} from '../../domain/posts';

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

    render() {
        return (
            <div className="main">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {this.makePosts()}
                  </div>
                </div>
              </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
