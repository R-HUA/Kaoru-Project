import React, {useEffect, useState} from 'react';
import {Button, message} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import axios from "axios";
import {FOLLOW_URL, FOLLOWER_URL, FOLLOWING_URL} from "../../constant/url";
import {useDispatch, useSelector} from "react-redux";
import './Follow.css'

function Follow(props) {

    const [isFollow, setIsFollow] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const userInfo = useSelector(state => state.user);

    const dispatch = useDispatch();


    // get following and follower lists
    async function getFollowState(id) {

        let followings;
        let followers;



        if (!isLoading){
            setIsLoading(true);

            await axios.get(FOLLOWING_URL + id,
                {
                    headers: {
                        "token": localStorage.getItem("token"),
                    }
                }
            ).then(response => {
                if (response.data.code === 200){
                    followings = response.data.data;
                }
                else{
                    throw new Error(response.data.msg);
                }
            })

            console.log("FOLLOWING")

            await axios.get(FOLLOWER_URL + id,
                {
                    headers: {
                        "token": localStorage.getItem("token"),
                    }
                }
            ).then(response => {
                if (response.data.code === 200){
                    followers = response.data.data;
                }
                else{
                    throw new Error(response.data.msg || response.data.toString());
                }
            })

            console.log("FOLLOWER")

            console.log("followings,followers: ",followings,followers);

            setIsLoading(false);
        }



        return {following: followings, follower: followers};
    }


    // handle follow and unfollow
    const changeFollow = () => {
        setIsLoading(true);

        console.log("change follow");

        axios(
            {
                method: isFollow ? 'DELETE' : 'POST',
                url: FOLLOW_URL + props.uid,
                headers: {"token": localStorage.getItem("token")}
            }
        ).then(
            response => {
                if (response.data.code == 200){
                    if (isFollow){
                        dispatch({type: 'REMOVE_FOLLOWING', payload: props.uid});
                    }
                    else {
                        dispatch({type: 'ADD_FOLLOWING', payload: props.userInfo});
                    }
                    setIsFollow(!isFollow);
                }
                else{
                    message.error(response.data.msg || response.data.toString());
                }
            }
        ).catch(
            e => message.error(e)
        ).finally(
            () => setIsLoading(false)
        );

    }


    useEffect(() => {

        console.log("follow component : ",userInfo.following);

        if (props.uid){
            if (userInfo.id !== props.uid && userInfo.following && userInfo.follower) {
                userInfo.following.find(
                    (element) => {
                        if (element.id === props.uid) {
                            setIsFollow(true);
                        }
                    }
                )
            }


            if(!props.followLists){

                getFollowState(props.uid)
                    .then(r => {

                        if (userInfo.id === props.uid && !(userInfo.following && userInfo.follower)){
                            dispatch({type: 'SET_USER_FOLLOW_LISTS', payload: r});
                        }

                        props.setFollowLists(r);

                    })
                    .catch(e => message.error(e.message));
            }

        }

    }, [props.uid]);











    return (
        <Button
            type={props.type || "primary"}
            shape="round"
            style={ props.disply ? {} : {display: "none"}}
            className = {isFollow ? "follow-button--follow": "follow-button"}
            disabled={isLoading}
            size={props.size}
            onClick = {changeFollow}
        >

            { isLoading ? <LoadingOutlined /> : <span>{ isFollow ? "Following" : "Follow"}</span>}

        </Button>
    );
}

export default Follow;
