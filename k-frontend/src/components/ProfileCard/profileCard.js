import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";
import {CgMoreAlt} from "react-icons/cg";
import "./profile.css"

function ProfileCard(props) {

    return (
            <div className="profileCard">
                <span id="back-icon-box">
                    <BiArrowBack id="back-icon" onClick={() => {window.history.back();}}/>
                </span>

                <div className= "header-image">
                </div>
                <div id="header-box">
                    <div id="profile-image"></div>
                    <div id="name-id-box">
                        <p>Username</p>
                        <p className="description">不愿意透露名字的XXX！</p>
                    </div>
                    <div id="edit-box"><span id="more-box">
                        <CgMoreAlt id="more-header"/>
                    </span>
                        <button className="Follow">
                            {"Follow"}
                        </button>
                    </div>
                </div>



                <div id="following-follow-box">

                    <NavLink  className = "follow-text" to={"/"}>
                        <span id="number-follow">35 </span>
                        Following
                    </NavLink>


                    <NavLink  className ="follow-text" to={"/"}>
                        <span id="number-follow" className="margin-left">6 </span>
                        Followers
                    </NavLink>
                </div>

            </div>
    );
}

export default ProfileCard;