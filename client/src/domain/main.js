const defaultState = {
    token: undefined
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
    const token = localStorage.getItem('yukisnoo');

    if (token) {
        app.dispatch(setToken(tokwn))
    }
}

const appLoad = () => {
    return getTokenFromStorage;
}

const handleNewToken = (state = {}, action) => {
    newState = Object.create({}, state, {token: action.payload.token})
}

export const rootReducer = (state = defaultState, action) => {
    if (action.type === SET_TOKEN) {
        return handleNewToken(state, action);
    }

    return state;
}
