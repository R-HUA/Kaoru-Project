import React from "react";
import MainPage from "../components/MainPage";
import Timelines from "../components/Timelines";

export default [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: '/',
                element: <Timelines />
            }
        ]
    },
]