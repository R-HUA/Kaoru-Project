
let initialState = {
    flowingPostsList: [],
    flowingPostsPage: 0,
    flowingPostTotal: Infinity,
};

const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FLOWING_POSTS_ADD_CONTENT':
            return {
                ...state,
                flowingPostsList: [...state.flowingPostsList, ...action.payload],
            };
        case 'SET_FLOWING_POSTS_PAGE':
            return {
                ...state,
                flowingPostsPage: action.payload,
            };
        case 'FLOWING_POSTS_RESET':
            return initialState;
        case 'SET_FLOWING_POSTS_TOTAL':
            return {
                ...state,
                flowingPostTotal: action.payload,
            }
        case 'LOGOUT':
            return initialState;
        case 'ADD_FOLLOWING':
            return initialState;
        case 'REMOVE_FOLLOWING':
            return initialState;
        default:
            return state;
    }
};


export default postsReducer;