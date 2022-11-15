let initialState = {
    id: -1,
    nickName: '    ',
    avatar: 'https://rhua.blob.core.windows.net/rhuablob/kaoru.jpg',
    sex: ' ',
    email: '    ',
};

const userReducer = (state = initialState, action) => {
    if (action.type === 'SET_USER_INFO') {
        return {
            id: action.payload.id,
            nickName: action.payload.nickName,
            avatar: action.payload.avatar ? action.payload.avatar : state.avatar,
            sex: action.payload.sex,
            email: action.payload.email,
        }
    }
    else {
        return state;
    }
}


export default userReducer;
