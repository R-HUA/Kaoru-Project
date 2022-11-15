import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import userReducer from "../reducers/userReducer";

export default configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,

    }
});