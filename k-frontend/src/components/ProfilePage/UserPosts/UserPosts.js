import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {USER_POST_URL} from "../../../constant/url";
import {Empty, message, Spin} from "antd";
import Posts from "../../Feed/posts/posts";
import "./UserPosts.css"
import "../../Feed/Feed.css";
import {useSelector} from "react-redux";
import {LoadingOutlined} from "@ant-design/icons";

function UserPosts(props) {

    const [postList,setPostList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const handleScroll = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isBottom, setIsBottom] = useState(false);


    useEffect(() => {

        async function getPosts(e) {

            const totalH = document.body.scrollHeight || document.documentElement.scrollHeight;
            const clientH = window.innerHeight || document.documentElement.clientHeight;
            const validH = totalH - clientH;
            const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
            const scrollPercent = scrollH / validH;

            setIsLoading(true);

            if (!isBottom) {
                if (scrollPercent > 0.99 || scrollH === validH) {
                    const nextPage = currentPage + 1
                    await axios.get(USER_POST_URL(props.uid,nextPage),
                        {
                            headers: {
                                "token": localStorage.getItem("token"),
                            }
                        }
                    ).then(response => {
                        if (response.data.code === 200) {
                            const newList = [...postList, ...response.data.data.rows];

                            setPostList(newList);
                            // console.log(response.data.data.total , newList.length);
                            setIsBottom(response.data.data.total <= newList.length);
                            setCurrentPage(nextPage);
                        } else {
                            message.open({
                                type: 'error',
                                content: `Failed(${response.data.code}): ${response.data.msg} `,
                            });
                        }
                    }).catch(error => {
                        message.open({
                            type: 'error',
                            content: error + '',
                        });
                    });
                }
            }

            setIsLoading(false);
        }

        if(!handleScroll.current){
            handleScroll.current = getPosts;
            window.addEventListener("scroll", handleScroll.current);
        }

        if (!currentPage && props.uid){
            getPosts();
        }


        return () => {
            window.removeEventListener("scroll", handleScroll.current);
        }
    },[currentPage,props.uid]);



    return (
        <div className="userPosts">
            {

                postList.map((item, index) => {
                    return (
                        <Posts
                            key={item.id}
                            id={item.id}
                            poster = {props.poster}
                            postTime={item.createTime}
                            content={item.content}
                            images={[item.image1, item.image2, item.image3]}
                            video={item.video}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount}
                            viewCount={item.viewCount}
                            isTop = {item.isTop}
                            repost = {item.repost}
                        />
                    )
                })
            }

            <div className="post-bottom">
                {
                    isLoading ?
                        <Spin indicator={<LoadingOutlined spin/>} /> :
                        (postList.length === 0) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{paddingTop: 100}}/>
                }


                {
                    (isBottom) && <div className="nomore">That's all~</div>
                }
            </div>
        </div>


    );
}

export default UserPosts;