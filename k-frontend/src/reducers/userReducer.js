let initialState = {
    id: -1,
    nickName: 'Default',
    avatar: 'https://rhua.blob.core.windows.net/rhuablob/kaoru.jpg',
    sex: ' ',
    signature: 'Default signature given to everyone~',
};

const userReducer = (state = initialState, action) => {

    if (action.type === 'SET_USER_INFO') {
        return {
            id: action.payload.id,
            nickName: action.payload.nickName,
            avatar: action.payload.avatar ? action.payload.avatar : state.avatar,
            sex: action.payload.sex,
            signature: action.payload.signature ? action.payload.signature : state.signature,
        }
    }
    else {
        return state;
    }
}


export default userReducer;
