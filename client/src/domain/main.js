import Fetcher from '../domain/fetcher';

const fetcher = new Fetcher();
const defaultState = {
    loading: true
}

export const SET_TOKEN = 'SET_TOKEN';
const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: {
            token
        }
    }
}

export const getTokenFromStorage = (dispatch) => {
    const token = localStorage.getItem('snuki');

    if (token) {
        dispatch(setToken(token));
        fetcher.setAuthToken(token);
        return;
    }
}

export const fetchNewToken = (dispatch) => {
    fetcher.updateToken()
        .then(token => {
            dispatch(setToken(token));
        })
}

const appLoad = () => {
    return getTokenFromStorage;
}

export const rootReducer = (state = defaultState, action) => {
    return state;
}

export const mapDispatchToProps = (dispatch) => {
    return {
        appLoad: () => {
            return dispatch(appLoad())
        }
    }
}
