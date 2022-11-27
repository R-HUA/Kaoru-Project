import React from 'react';
import "./SideCard.css";
import {useDispatch, useSelector} from "react-redux";
function SideCard(props) {

    const userInfo = useSelector(state => state.user)

    return (

        <div className="side-card" id="bottom-nav">

                <div className="author-container">

                    <img className="user-avatar" src={userInfo.avatar}/>

                    <p className="user-name"> {userInfo.nickName} </p>

                    <div className="user-desc"> {userInfo.signature} </div>

                </div>

        </div>
    );
}

export default SideCard;