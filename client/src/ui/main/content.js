import React from 'react';
import {connect} from 'react-redux';
import Post from '../components/post';

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        //this.props.dispatch(getConfig())
    }

    render() {
        return (
            <div className="main">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                  </div>
                </div>
              </div>
            </div>
        )
    }
}


export default connect()(MainContent);
