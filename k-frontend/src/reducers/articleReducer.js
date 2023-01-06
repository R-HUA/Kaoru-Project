
let initialState = {
    flowingArticleList: [],
    flowingArticlePage: 0,
    flowingArticleTotalPages: Infinity,
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FLOWING_ARTICLE_ADD_CONTENT':
            return {
                ...state,
                flowingArticleList: [...state.flowingArticleList, ...action.payload],
            };
        case 'SET_FLOWING_ARTICLE_PAGE':
            return {
                ...state,
                flowingArticlePage: action.payload,
            };
        case 'FLOWING_ARTICLE_RESET':
            return initialState;
        case 'SET_FLOWING_ARTICLE_TOTAL_PAGES':
            return {
                ...state,
                flowingArticleTotalPages: action.payload,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};


export default articleReducer;