import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Navigate, useRoutes} from "react-router-dom";
import needLogin from "../../routes/needLogin";
import noLogin from "../../routes/noLogin";

function MainRoutes(props) {

    const logininfo = useSelector(state => state.login)
    const dispatch = useDispatch()

    const routeAuth = (routes,condition,navto) => (
        routes.map((item) => (
            {
                path: item.path,
                element: condition ? item.element : <Navigate to={navto} />,
                children:item?.children && item.children.length > 0 ? routeAuth(item.children,condition,navto) : null

            }
        ))
    )


    // 根据登录状态判断路由
    const routelist = useRoutes(
        routeAuth(needLogin,logininfo.isLogin,'/login').concat(
            routeAuth(noLogin,!logininfo.isLogin,'/')
        )
    )





    return (
        < >
            {routelist}
        </>
    );
}

export default MainRoutes;