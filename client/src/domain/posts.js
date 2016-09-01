import {SET_TOKEN} from './main';
import Fetcher from './fetcher';

const fetcher = new Fetcher();
const initialState = {
    selected: undefined,
    loading: false,
    items: [],
    listing: {}
}

// When a user clicks on a post
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

// initial loading and infinite scroll
export const ADD_POSTS = 'ADD_POSTS';
const addPosts = (listing) => {
    return {
        type: ADD_POSTS,
        payload: listing
    }
}

const handleAddPosts = (state = {}, action) => {
    const newItems = [...state.items, ...action.payload.data.children];

    return Object.assign({}, state, {
        items: newItems,
        listing: action.payload.data
    })
}

// Get some posts async
const requestPosts = (subreddit, prevListing) => {
    return dispatch => {
        if (subreddit === 'frontpage') {
            fetcher.getFrontPage(prevListing).then(listing => {
                dispatch(addPosts(listing));
            });

            return;
        }

        fetcher.getPage(subreddit, prevListing).then(listing => {
            dispatch(addPosts(listing));
        })
    }
}

// load more posts
const loadMore = () => {
    return (dispatch, getState) => {
        const {posts} = getState();
        dispatch(requestPosts('frontpage', posts.listing));
    }
}

// root reducer for posts
export const postsReducer = (state = initialState, action) => {
    if (action.type === SELECT_POST) {
        return handleSelectPost(state, action);
    }

    if (action.type === ADD_POSTS) {
        return handleAddPosts(state, action);
    }

    return state;
}

// public interface for views
export const mapDispatchToProps = (dispatch) => {
    return {
        selectPost: (post) => {
            return dispatch(selectPost(post));
        },
        requestPosts: (subreddit, listing) => {
            return dispatch(requestPosts(subreddit, listing));
        },
        loadMore: () => {
            return dispatch(loadMore());
        }
    }
}

// public data for views
export const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        selected: state.posts.selected
    }
}

// public interface for other domains to explode fragments
export const getPostById = (state, id) => {
    return state.posts.items.find(post => {
        return post.data.id === id;
    })
}
