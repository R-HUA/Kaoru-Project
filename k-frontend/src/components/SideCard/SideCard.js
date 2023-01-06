import React, {useEffect} from 'react';
import "./SideCard.css";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import Follow from "../Follow/Follow";
function SideCard(props) {

    const userInfo = useSelector(state => state.user)

    const [follow, setFollow] = React.useState();

    useEffect(() => {
        if (userInfo.following && userInfo.follower){
            setFollow({following: [], follower: []})
        }
    }, [userInfo]);

    console.log(userInfo);

    return (

        <div className="side-card" id="bottom-nav">

            <div className="author-container" to={'/profile/' + userInfo.id}>
                <NavLink to={'/profile/' + userInfo.id}>
                    <img className="user-avatar" src={userInfo.avatar} alt=""/>
                    <p className="user-name"> {userInfo.nickName} </p>
                </NavLink>
                <div className="user-desc"> {userInfo.signature} </div>
            </div>

            <Follow
                disply ={false}
                uid = {userInfo.id}
                userInfo = {userInfo}
                followLists = {follow}
                setFollowLists = {setFollow}
                size = "large"/>

        </div>
    );
}

export default SideCard;