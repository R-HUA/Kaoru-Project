import "./navbar.css"
import {NavLink} from "react-router-dom";
import {BiBookmark, BiCollection, BiHash, BiHomeCircle, BiUserCircle} from "react-icons/bi";
import React from "react";
import {RiFileList2Line} from "react-icons/ri";

export function MobileNav() {
	return (
		<nav className="mobileNav">
			<ul>
				<li>
					<NavLink to={"/"}>
						<span className="material-icons-outlined"><BiHomeCircle className ="home-icon"/></span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/moment"}>
						<span className="material-icons-outlined"><BiCollection className ="home-icon"/></span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/article"}>
						<span className="material-icons-outlined"><RiFileList2Line className ="home-icon"/></span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/userinfo"}>
						<span className="material-icons-outlined"><BiUserCircle className ="home-icon"/></span>
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}