import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Profilepage from "../ProfilePage/profilepage";

function UserInfo(props) {


    const userID = useParams().id;

    const navigate = useNavigate();

    useEffect(() => {

        if(userID){
            navigate("/userInfo");
        }
    }, [userID]);


    return (userID ? <div> {userID} </div> : <Profilepage/>);
}

export default UserInfo;