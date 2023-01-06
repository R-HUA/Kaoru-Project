import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import userReducer from "../reducers/userReducer";
import postsReducer from "../reducers/postsReducer";
import thunk from 'redux-thunk';
import articleReducer from "../reducers/articleReducer";

export default configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        posts: postsReducer,
        article: articleReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});