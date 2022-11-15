import React, {Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Navigate, useLocation, useRoutes} from "react-router-dom";
import needLogin from "../needLogin";
import noLogin from "../noLogin";
import {Loading} from "element-react";
import Validation from "../../components/Validation/Validation";

function MainRoutes(props) {

    const location = useLocation();

    const logininfo = useSelector(state => state.login);

    const token = localStorage.getItem('token')

    const routeAuth = (routes,condition,navto) => (

        routes.map((item) => (

            {
                path: item.path,
                element: condition ? item.element : (token && !logininfo.isLogin ? <Validation/> : <Navigate to={navto} />),
                children:item?.children && item.children.length > 0 ? routeAuth(item.children,condition,navto) : null

            }
        ))
    )


    // 根据登录状态判断路由
    const routeList = useRoutes(
        routeAuth(needLogin,logininfo.isLogin,'/login').concat(
            routeAuth(noLogin,!logininfo.isLogin,'/')
        )
    )


    return (
        <Suspense fallback={<Loading fullscreen={true} />}>
            {routeList}
        </Suspense>
    );
}

export default MainRoutes;