import React, {Suspense} from "react";
import "./mainpage.css"
import NavBar from "../NavBar";
import Container from "../Container/container";
import {Outlet} from "react-router-dom";
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const MainPage = () => {
	return (
		<div id = "main-container">
			<div id="nav-box">
				<NavBar />
			</div>
			{
				/*
    				在父路由元素中使用 <Outlet /> 来呈现它们的子路由元素 (指定子元素位置)
    				This allows nested UI to show up when child routes are rendered.
    				在一级路由中使用没有效果
				*/
			}
			<Container>
				<Suspense fallback={<Spin indicator={<LoadingOutlined style={{fontSize: 24, marginTop: "35%"}} spin/>} />}>
					<Outlet />
				</Suspense>
			</Container>
		</div>
	)
};

export default MainPage;