import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

import './ArticleList.css';
import {Avatar, Card, Empty, message, Skeleton, Space} from "antd";
import Meta from "antd/es/card/Meta";
import {Link, NavLink} from "react-router-dom";
import {PiShare} from "react-icons/pi";
import {LiaComment} from "react-icons/lia";
import {TbHeart, TbHeartFilled} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../actions/getPostAction";
import {getArticleListAction} from "../../actions/getArticleListAction";
import {formatTime} from "../../constant/times";
import {USER_ARTICLE_URL, USER_POST_URL} from "../../constant/url";


export const ArticleImg = (props) => {
    const [imgClass, setImgClass] = useState("article-image-container");

    useEffect(() => {
        const tempImg = new Image();
        tempImg.src = props.img;
        tempImg.onload = () => {
            const width = tempImg.width;
            const height = tempImg.height;
            if (width => height) {
                setImgClass("article-image-container-horizontal");
            } else {
                setImgClass("article-image-container");
            }
        };
    }, []);


    return (
        <div className = {imgClass}>
            <img src={props.img} alt="article thumbnail"/>
        </div>
    );
};

const ArticleList = (props) => {



    const [hasMore, setHasMore] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);

    const [alist, setAlist] = useState([]);

    const dispatch = useDispatch();

    const articleListInfo = useSelector(state => state.article);

    const articleList = articleListInfo.flowingArticleList;

    const loadingState = useSelector(state => state.login.isLoading);

    const [isLoding, setIsLoding] = useState(false);


    useEffect(() => {

        if (!props.uid){


            dispatch(getArticleListAction(currentPage + 1));

            setCurrentPage(articleListInfo.flowingArticlePage);


            const handleScroll = (e) => {
                const totalH = document.body.scrollHeight || document.documentElement.scrollHeight;
                const clientH = window.innerHeight || document.documentElement.clientHeight;
                const validH = totalH - clientH;
                const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
                const scrollPercent = scrollH / validH;
                if (scrollPercent > 0.99) {
                    dispatch(getArticleListAction(currentPage + 1));
                    setCurrentPage(articleListInfo.flowingArticlePage);
                }
            }

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            }
        }

    }, []);



    useEffect(() => {
        if (props.uid){
            //console.log("uid: ", props.uid);


            const handleScroll = (e) => {
                const totalH = document.body.scrollHeight || document.documentElement.scrollHeight;
                const clientH = window.innerHeight || document.documentElement.clientHeight;
                const validH = totalH - clientH;
                const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
                const scrollPercent = scrollH / validH;
                if (scrollPercent > 0.99 || (currentPage === 0 && e===1)) {
                    const nextPage = currentPage + 1;

                    if (hasMore && !isLoding){
                        setIsLoding(true);
                        axios.get(USER_ARTICLE_URL(props.uid,nextPage),
                            {
                                headers: {
                                    "token": localStorage.getItem("token"),
                                }
                            }
                        ).then(response => {
                            if (response.data.code === 200) {
                                const newList = [...alist, ...response.data.data.rows]
                                    .map((item) => {
                                        return {
                                            ...item,
                                            poster: props.poster,
                                        };
                                    });

                                setAlist(newList);

                                setHasMore(nextPage < response.data.data.pages);
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
                        }).finally(() => {
                            //console.log("isLoding: ", isLoding);
                            setIsLoding(false);
                        });
                    }
                }
            }

            window.removeEventListener("scroll", handleScroll);

            handleScroll(1);

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            }
        }
    }, [isLoding, currentPage, hasMore]);





    return (
        <Space
            direction="vertical"
            size="middle"
            className="articlelist-container"
        >
            { (props.uid ? alist : articleList)
                .filter((item, index, itself) => (itself.indexOf(item) === index))
                .map((item, index) => (
                <Card>
                    <Meta
                        avatar={<Avatar src={item.poster.avatar}>item.poster.nickName</Avatar>}
                        title= {<Link className='card-username-link' to={'/profile/' + item.poster.id}>{item.poster.nickName}</Link>}
                        description =  {
                            <div className="article-card-desc">
                                <NavLink to = {"/article/" + item.id}>
                                    <div className="article-list-time">
                                        <span>{formatTime(item.createTime)}  </span>
                                        <span style={{marginLeft: 10}}>{item.viewCount} views</span>
                                    </div>
                                    <h2>{item.title}</h2>
                                    <div>
                                        <p>{item.summary}</p>
                                        <div className="articlelist-more">view more</div>
                                    </div>
                                </NavLink>

                                <ArticleImg img={item.thumbnail}/>

{/*                                <Space>
                                    <div className="engageLink">
                                        <span className="material-icons-outlined engageLink">
                                            <PiShare className="bottom-icon"/>
                                        </span>
                                        <p></p>
                                    </div>

                                    <div className="engageLink">
                                        <span className="material-icons-outlined engageLink">
                                            <LiaComment/>
                                        </span>
                                        <p>{item.commentCount}</p>
                                    </div>

                                    <div className="engageLink" >
                                        <span className="material-icons-outlined engageLink" style={{paddingTop: "1px"}}>
                                           {(false)?  <TbHeartFilled/> : <TbHeart/>}
                                        </span>
                                        <p>{item.likeCount}</p>
                                    </div>
                                </Space>*/}
                            </div>
                        }
                    />
                </Card>
            ))}

            { (loadingState || isLoding) ? <Skeleton active /> : ((props.uid ? alist : articleList).length === 0  && <Empty description="No articles"/>) }
            <div className="viewmore">
                {!(currentPage < articleListInfo.flowingArticleTotalPages) && <div className="tcolors-bg">No More Articles</div>}
            </div>
        </Space>
    );
}

export default ArticleList;