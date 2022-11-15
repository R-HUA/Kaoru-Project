import { lazy } from 'react';
import {Navigate} from "react-router-dom";
import NewArticle from "../components/NewArticle/NewArticle";

let Article  =  lazy(() => import("../components/Article/Article"));
let Profile =  lazy(() => import("../components/ProfilePage/profilepage"));
let MainPage = lazy(() => import("../components/MainPage"));
let Timelines = lazy(() => import( "../components/Timelines"));


const noLogin = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: '/',
                element: <Timelines />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'article',
                element: <Article/>
            },
            {
                path: 'article/new',
                element: <NewArticle/>
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    },
]

export default noLogin;