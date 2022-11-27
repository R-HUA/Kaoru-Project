import React from 'react';
import "./navbar.css";
import {FaTwitter} from "react-icons/fa";
import {BiBookmark, BiHash, BiHomeCircle, BiMessageSquareDetail,} from "react-icons/bi";
import {IoNotificationsOutline} from "react-icons/io5";
import {RiContactsFill, RiContactsLine, RiFileList2Line} from "react-icons/ri";
import {CgMoreAlt, CgMoreO} from "react-icons/cg";
import SideCard from "../SideCard/SideCard";
import {NavLink} from "react-router-dom";
import {IoMdNotificationsOutline} from "react-icons/io";
import {Popover} from "antd";
import {RightOutlined} from "@ant-design/icons";

function NavBar(props) {
    return (
        <div id="container-nav">
            <div id="nav-up">


                <SideCard/>

                <NavLink to="/">
                    <button className = "row">
                        <BiHomeCircle className ="home-icon"/>
                        <p className ="nav-title">Home</p>
                    </button>
                </NavLink>

                <button className = "row">
                    <BiHash className ="home-icon"/>
                    <p className ="nav-title">Explore</p>
                </button>

                <NavLink to="/article">
                    <button className = "row">
                        <RiFileList2Line className ="home-icon"/>
                        <p className ="nav-title">Article</p>
                    </button>
                </NavLink>

                <button className = "row">
                    <BiMessageSquareDetail className ="home-icon"/>
                    <p className ="nav-title">Messages</p>
                </button>

                <button className = "row">
                    <BiBookmark className ="home-icon"/>
                    <p className ="nav-title">Bookmarks</p>
                </button>

                <NavLink to="/profile">
                    <button className = "row">
                        <RiContactsLine className ="home-icon"/>
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

                            <NavLink to="/edit" className = "more-row">
                                <p>Setting</p>
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
                    <CgMoreO className ="home-icon"/>
                        <p className ="nav-title">More</p>
                </button>
                </Popover>
            </div>
            
        </div>
    );
}

export default NavBar;