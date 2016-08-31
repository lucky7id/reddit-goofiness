const posts = require('../../posts.json');
const initialState = {
    selected: undefined,
    loading: false,
    items: posts.data.children
}

export const SELECT_POST = 'SELECT_POST';
const selectPost = (post) => {
    return {
        type: SELECT_POST,
        payload: {post}
    }
}

const handleSelectPost = (state = {}, action) => {
    return Object.assign({}, state, {selected: action.payload.post.data.id});
}

export const postsReducer = (state = initialState, action) => {
    if (action.type === SELECT_POST) {
        return handleSelectPost(state, action);
    }

    return state;
}

export const mapDispatchToProps = (dispatch) => {
    return {
        selectPost: (post) => {
            return dispatch(selectPost(post))
        }
    }
}

export const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        selected: state.posts.selected
    }
}


export const getPostById = (state, id) => {
    return state.posts.items.find(post => {
        return post.data.id === id;
    })
}
