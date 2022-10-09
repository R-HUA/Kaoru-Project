let initialState = {
    isLogin: true,
    token: null,
};

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLogin: true,
            }
        default:{
            return state;
        }
    }
}

export default loginReducer;