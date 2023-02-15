import React from 'react';
import "./navbar.css";
import {
    BiBookmark,
    BiCollection,
    BiBookmarkAlt,
    BiHomeAlt,
    BiMessageDots,
    BiDotsHorizontalRounded, BiDotsVerticalRounded, BiUserCircle
} from "react-icons/bi";
import {RiContactsLine, RiFileList2Line} from "react-icons/ri";
import {CgMoreO} from "react-icons/cg";
import SideCard from "../SideCard/SideCard";
import {NavLink} from "react-router-dom";
import {Popover} from "antd";
import {RightOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

function NavBar(props) {

    const userInfo = useSelector(state => state.user);



    return (
        <div id="container-nav">
            <div id="nav-up">

                <SideCard/>

                <NavLink to="/">
                    <button className = "row">
                        <BiHomeAlt className ="home-icon"/>
                        <p className ="nav-title">Home</p>
                    </button>
                </NavLink>

                <NavLink to="/moment">
                    <button className = "row">
                        <BiCollection className ="home-icon"/>
                        <p className ="nav-title">Moment</p>
                    </button>
                </NavLink>

                <NavLink to="/article">
                    <button className = "row">
                        <RiFileList2Line className ="home-icon"/>
                        <p className ="nav-title">Article</p>
                    </button>
                </NavLink>

                <NavLink to="/message">
                <button className = "row">
                    <BiMessageDots className ="home-icon"/>
                    <p className ="nav-title">Message</p>
                </button>
                </NavLink>

                <NavLink to="/bookmark">
                <button className = "row">
                    <BiBookmark className ="home-icon"/>
                    <p className ="nav-title">Bookmark</p>
                </button>
                </NavLink>

                <NavLink to={"/userinfo/" + userInfo.id}>
                    <button className = "row">
                        <BiUserCircle className ="home-icon"/>
                        <p className="nav-title">Profile</p>
                    </button>
                </NavLink>

                <Popover
                    content={(
                        <div style={{paddingTop: 8, paddingBottom: 5}}>
                            <NavLink to="/article/new" className = "more-row">
                                <p>Creat</p>
                                <RightOutlined />
                            </NavLink>

                            <NavLink to="/setting" className = "more-row">
                                <p>Setting</p>
                                <RightOutlined />
                            </NavLink>

                            <NavLink to="/logout" className = "more-row">
                                <p>Log out</p>
                                <RightOutlined />
                            </NavLink>
                        </div>
                    )}
                    arrow={false}
                    autoAdjustOverflow={false}
                    placement="bottom"
                    getPopupContainer={(triggerNode) => (triggerNode.parentNode instanceof HTMLElement ? triggerNode.parentNode : document.body)}
                    trigger="hover">
                <button className = "row" >
                    <BiDotsVerticalRounded className ="home-icon"/>
                        <p className ="nav-title">More</p>
                </button>
                </Popover>
            </div>
            
        </div>
    );
}

export default NavBar;