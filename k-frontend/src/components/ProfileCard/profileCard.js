import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";
import {CgMoreAlt} from "react-icons/cg";
import "./profile.css"
import Follow from "../Follow/Follow";

function ProfileCard(props) {

    const [follow, setFollow] = React.useState();

    const navigate = useNavigate();

    return (
            <div className="profileCard">
                <span id="back-icon-box">
                    <BiArrowBack id="back-icon" onClick={() => {window.history.back();}}/>
                </span>

                <div className= "header-image" style={{ backgroundImage: `url(${props.userInfo.headerImg})`}} >
                </div>
                <div id="header-box">
                    <div id="profile-image">
                        <img src={props.userInfo.avatar}  alt=""/>
                    </div>
                    <div id="name-id-box">
                        <p>{props.userInfo.nickName}</p>
                        <p className="description">{props.userInfo.signature}</p>
                    </div>
                    <div id="edit-box">
{/*                        <span id="more-box">
                            <CgMoreAlt id="more-header"/>
                        </span>*/}
                        { (props.isThisUser) &&
                            <button className="edit-button" onClick={() => navigate("/edit")}>Edit</button> }
                        {
                            <Follow
                                disply ={!props.isThisUser}
                                uid = {props.userInfo.id}
                                userInfo = {props.userInfo}
                                followLists = {follow}
                                setFollowLists = {setFollow}
                                size = "large"/>
                        }
                    </div>
                </div>



                <div id="following-follow-box">

                    <NavLink  className = "follow-text" to={"/profile"}>
                        <span id="number-follow">{(follow && follow.following && follow.following.length)} </span>
                        Following
                    </NavLink>


                    <NavLink  className ="follow-text" to={"/profile"}>
                        <span id="number-follow" className="margin-left">{(follow && follow.follower && follow.follower.length)} </span>
                        Followers
                    </NavLink>
                </div>

            </div>
    );
}

export default ProfileCard;