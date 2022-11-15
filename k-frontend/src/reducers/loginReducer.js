let initialState = {
    isLogin: false,
    isLoading: false,
    needLogin: false,
};

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLogin: true,
            }
        case 'LOGOUT':
            return {
                ...state,
                isLogin: false,
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            }
        case 'LOADED':
            return {
                ...state,
                isLoading: false,
            }
        case 'NEED_LOGIN':
            return {
                ...state,
                needLogin: true,
            }
        case 'NO_NEED_LOGIN':
            return {
                ...state,
                needLogin: false,
            }
        default:{
            return state;
        }

    }
}

export default loginReducer;