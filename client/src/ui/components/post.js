import React from 'react';
import {connect} from 'react-redux';

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    select() {
        this.props.select(this.props.body)
    }

    render() {
        const post = this.props.body.data
        return (
            <div className={`post-container ${this.props.selected === post.id ? 'active' : ''}`}>
              <div className="row">
                <div className="col-md-11" onClick={this.select}>
                  <div className="media post-panel">
                    <div className="media-left">
                      {post.thumbnail && <img className="media-object" src={post.thumbnail} alt="..." />}
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{post.title}</h4>

                    </div>
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="btn-group-vertical votes">
                    <button className="btn vote up" type="button"><i className="material-icons">arrow_upward</i></button>
                    <button className="btn vote count" type="button">400</button>
                    <button className="btn vote down" type="button"><i className="material-icons">arrow_downward</i></button>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
