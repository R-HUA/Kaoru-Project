import "./navbar.css"
import {Link} from "react-router-dom";
import {BiBookmark, BiHash, BiHomeCircle} from "react-icons/bi";
import React from "react";

export function MobileNav() {
	return (
		<nav className="mobileNav">
			<ul>
				<li>
					<Link to={"/"}>
						<span className="material-icons-outlined"><BiHomeCircle className ="home-icon"/></span>
					</Link>
				</li>
				<li>
					<Link to={"/explore"}>
						<span className="material-icons-outlined"><BiHash className ="home-icon"/></span>
					</Link>
				</li>
				<li>
					<Link to={"/bookmarks"}>
						<span className="material-icons-outlined"><BiBookmark className ="home-icon"/></span>
					</Link>
				</li>
			</ul>
		</nav>
	)
}