import {SELECT_POST, getPostById} from './posts';

const initialState = {
    isLoading: false
}

export const CONTENT_LOADING = 'CONTENT_LOADING';
const contentLoading = (isLoading) => {
    return {
        type: CONTENT_LOADING,
        payload: {isLoading}
    }
}

const handleLoading = (state, action) => {
    return Object.assign({}, state, {isLoading: action.payload.isLoading});
}

export const contentReducer = (state = initialState, action) => {    
    if (action.type === CONTENT_LOADING) {
        return handleLoading(state, action);
    }

    return state;
}

export const mapStateToProps = (state) => {
    return Object.assign({}, state, {selected: getPostById(state, state.posts.selected)})
}

export const mapDispatchToProps = (dispatch) => {
    return {
        contentLoading: (isLoading) => {
            return dispatch(contentLoading(isLoading));
        }
    }
}
