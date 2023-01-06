import React, {useEffect} from 'react';
import NavHeader from "./NavHeader/NavHeader";
import ProfileCard from "../ProfileCard/profileCard";
import "./profilepage.css"
import {useParams} from "react-router-dom";
import UserPosts from "./UserPosts/UserPosts";
import {useSelector} from "react-redux";
import axios from "axios";
import {USER_INFO_URL} from "../../constant/url";
import {message} from "antd";
import ArticleList from "../ArticleList/ArticleList";

function ProfilePage(props) {

    const [selected, setSelected] = React.useState(0);

    const [posterInfo, setPosterInfo] = React.useState({});

    const [isThisUser, setIsThisUser] = React.useState(false);

    const uidParam = useParams();

    const userInfo = useSelector(state => state.user);

    useEffect(() => {

        console.log(uidParam);


        function loadData(){
            if (!uidParam.id || uidParam.id == userInfo.id) {
                setPosterInfo(userInfo);
                setIsThisUser( true);

                console.log("current user");
            }
            else{

                axios.get(USER_INFO_URL + "/" + uidParam.id,
                    {
                        headers: { 'token': localStorage.getItem('token') }
                    }
                ).then(response => {
                    if (response.data.code === 200) {
                        console.log(response.data);
                        setPosterInfo(response.data.data);
                    }
                    else {
                        message.error("Error: " + response.data.msg)
                        loadData();
                    }
                }).catch(error => {
                    message.error(error + ", Failed to get user info")
                });
            }
        }

        if (!posterInfo || !posterInfo.id) {
            loadData();
        }
        else {
            if (posterInfo.id !== (uidParam ? uidParam.id : userInfo.id)) {
                setPosterInfo({});
            }
        }
    }, [uidParam]);


    return ( posterInfo &&
        <div className= "profile-page" >
            <div className= "profile-upper">
                <ProfileCard userInfo = {posterInfo} isThisUser = {isThisUser}/>
                <NavHeader setSelected = {setSelected} selected = {selected}/>
            </div>
            {
                [
                    <UserPosts uid = {posterInfo.id} poster = {posterInfo}/>,
                    <ArticleList uid = {posterInfo.id} poster = {posterInfo}/>,
                    <div>2</div>,
                    <div>3</div>,
                ][selected]
            }
        </div>
    );

}

export default ProfilePage;