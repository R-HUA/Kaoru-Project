import { lazy } from 'react';
import Placeholder from "../components/Placeholder/Placeholder";
import Home from "../components/HomePage/Home";

let NewArticle  =  lazy(() => import( "../components/NewArticle/NewArticle"));
let Article  =  lazy(() => import("../components/Article/Article"));
let Profile =  lazy(() => import("../components/ProfilePage/profilepage"));
let MainPage = lazy(() => import("../components/MainPage"));
let Timelines = lazy(() => import( "../components/Timelines"));
let Logout = lazy(() => import( "../components/Login/logout"));
let ArticleList = lazy(() => import( "../components/ArticleList/ArticleList"));
let NotFound = lazy(() => import( "../components/NotFound/NotFound"));
let EditProfile = lazy(() => import( "../components/EditProfile/EditProfile"));
let UserInfo = lazy(() => import( "../components/UserInfo/UserInfo"));

const noLogin = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: 'moment',
                element: <Timelines />
            },
            {
                path: 'moment/:id',
                element: <Timelines />
            },
            {
                path: 'userinfo',
                element: <UserInfo />
            },
            {
                path: 'userinfo/:id',
                element: <UserInfo />
            },
            {
                path: 'profile/:id',
                element: <Profile />
            },
            {
                path: 'article',
                element: <ArticleList/>
            },
            {
                path: 'article/:id',
                element: <Article/>
            },
            {
                path: 'article/new',
                element: <NewArticle/>
            },
            {
                path:'edit',
                element:<EditProfile/>,
            },
            {
                path: 'logout',
                element: <Logout/>
            },
            {
                path: 'setting',
                element: <Placeholder/>
            },
            {
                path: 'bookmark',
                element: <Placeholder/>
            },
            {
                path: 'message',
                element: <Placeholder/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    },
]

export default noLogin;