export const userInitialState = {
    id: -1,
    nickName: 'Default',
    avatar: 'https://upload-os-bbs.hoyolab.com/upload/2022/09/16/074db8f69d6b4eb66139b837405416f6_2637497491200521781.png',
    sex: ' ',
    signature: 'Default signature given to everyone~',
    headerImg: '',
    email: '',
    phone: '',
    following: null,
    follower: null,
};

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return {
                ...state,
                id: action.payload.id,
                nickName: action.payload.nickName,
                avatar: action.payload.avatar ? action.payload.avatar : state.avatar,
                headerImg: action.payload.headerImg,
                sex: action.payload.sex,
                signature: action.payload.description ? action.payload.description : state.signature,
                email: action.payload.email,
                phone: action.payload.phoneNumber
            };
        case 'SET_USER_FOLLOW_LISTS':
            return {
                ...state,
                following: action.payload.following,
                follower: action.payload.follower,
            };
        case 'SET_USER_following':
            return {
                ...state,
                following: action.payload ? action.payload : state.following
            };
        case 'SET_USER_follower':
            return {
                ...state,
                follower: action.payload ? action.payload : state.follower
            };
        case 'REMOVE_FOLLOWING':
            return {
                ...state,
                following: state.following.filter((item) => item.id !== action.payload)
            }
        case 'ADD_FOLLOWING':
            return {
                ...state,
                following: [...state.following, action.payload]
            }
        case 'LOGOUT':
            return userInitialState;
        default:
            return state;
    }

}


export default userReducer;
