import React from 'react';
import "./navbar.css";
import {FaTwitter} from "react-icons/fa";
import {BiBookmark, BiHash, BiHomeCircle, BiMessageSquareDetail,} from "react-icons/bi";
import {IoNotificationsOutline} from "react-icons/io5";
import {RiContactsFill, RiFileList2Line} from "react-icons/ri";
import {CgMoreAlt, CgMoreO} from "react-icons/cg";

function NavBar(props) {
    return (
        <div id="container-nav">
            <div id="nav-up">
                <span className = "row">
                </span>
                <button className = "row">
                    <BiHomeCircle className ="home-icon"/>
                    <p className ="nav-title">Home</p>
                </button>

                <button className = "row">
                    <BiHash className ="home-icon"/>
                    <p className ="nav-title">Explore</p>
                </button>

                <button className = "row">
                    <IoNotificationsOutline className ="home-icon"/>
                    <p className ="nav-title">Notifications</p>
                </button>

                <button className = "row">
                    <BiMessageSquareDetail className ="home-icon"/>
                    <p className ="nav-title">Messages</p>
                </button>

                <button className = "row">
                    <BiBookmark className ="home-icon"/>
                    <p className ="nav-title">Bookmarks</p>
                </button>

                <button className = "row">
                    <RiFileList2Line className ="home-icon"/>
                    <p className ="nav-title">Lists</p>
                </button>

                <button className = "row">
                    <RiContactsFill className ="home-icon"/>
                    <p className="nav-title">Profile</p>
                </button>

                <button className = "row">
                    <CgMoreO className ="home-icon"/>
                    <p className ="nav-title">More</p>
                </button>

            </div>

            <div id="bottom-nav">
                <span id="user-box">
                  <img
                      id="person"
                      src=""
                      alt="profile"
                  />
                  <span id="name">
                    <p>name</p>
                  </span>
                </span>
            </div>
        </div>
    );
}

export default NavBar;