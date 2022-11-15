import React from 'react';
import NavHeader from "./NavHeader/NavHeader";
import Feed from "../Feed/feed";
import ProfileCard from "../ProfileCard/profileCard";
import "./profilepage.css"

function ProfilePage(props) {
    return (
        <div className= "profile-page" >
            <div className= "profile-upper">
                <ProfileCard/>
                <NavHeader/>
            </div>
            <Feed/>
        </div>
    );
}

export default ProfilePage;