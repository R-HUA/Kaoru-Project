import {lazy} from "react";


let Login  = lazy(() => import("../components/Login/login"));
let Register = lazy(() => import("../components/Login/register"));
let Kaoru = lazy(() => import( "../components/kaoru/kaoru"));

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
    {
        path: '/kaoru',
        element: <Kaoru/>,
        children: []
    }
]

export default noLogin;