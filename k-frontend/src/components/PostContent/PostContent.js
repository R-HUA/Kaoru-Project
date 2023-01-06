import React, {useEffect} from 'react';
import {Drawer} from "antd";
import './PostContent.css';
import Post from "../Feed/posts/posts";
import {REPLY_TYPE_POST} from "../../constant/types";
import Comments from "../Comments/comments";
import {BiArrowBack} from "react-icons/bi";
import {useLocation, useNavigate} from "react-router-dom";

function PostContent(props) {

    const item = props.postDetail;

    const pathname = useLocation().pathname;

    return (
        <div className="post-content-container" style={(props.postId === -1) ? {display: "none"} : {}}>

            <span id="back-icon-box">
                <BiArrowBack id="back-icon" onClick={props.onClose}/>
            </span>

            { item &&
                <div className="postcontent">

                    <Post
                        key={item.id}
                        id={item.id}
                        poster = {item.poster}
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

                    <Comments articleId = {item.id} commentsCount={item.commentCount} type={REPLY_TYPE_POST}/>
                </div>
            }
        </div>
    );
}

export default PostContent;