import React from 'react';
import {connect} from 'react-redux';

export default class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="post-container">
              <div className="row">
                <div className="col-md-11">
                  <div className="media post-panel">
                    <div className="media-left">
                      <img className="media-object" src="https://i.imgflip.com/19pdpk.jpg" alt="..." />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Media heading</h4> some post text
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
