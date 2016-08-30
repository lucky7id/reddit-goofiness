// stylesheets for webpack loader
require('../assets/styles/style.sass');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { rootReducer } from './domain/main.js';
import App from './ui/app.js';

const initialState = {
    routing: undefined
}

const store = createStore(
    combineReducers({
        app: rootReducer,
        routing: routerReducer
    }),
    initialState,
    compose(
        applyMiddleware(ReduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);


const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>,
  document.getElementById('app')
)
