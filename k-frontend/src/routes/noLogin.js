import {lazy} from "react";


let Login  = lazy(() => import("../components/Login/login"));
let Register = lazy(() => import("../components/Login/register"));


const noLogin = [
    {
        path: '/login',
        element: <Login/>,
        children: []
    },
    {
        path: '/register',
        element: <Register/>,
        children: []
    },
]

export default noLogin;