import React, {useEffect, useState} from "react";
import "./Feed.css";
import Posts from "./posts/posts";
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../actions/getPostAction";
import PostContent from "../PostContent/PostContent";
import {useLocation, useNavigate} from "react-router-dom";
import {Empty, Skeleton} from "antd";

const Feed = (props) => {


    const postList = useSelector(state => state.posts.flowingPostsList);
    const flowingPostsPage = useSelector(state => state.posts.flowingPostsPage);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [postOpen, setOpenPostDetail] = useState(-1);
    const [scoll, setScoll] = useState([0,0]);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const loadingState = useSelector(state => state.login.isLoading);


    const handleScroll = (e) => {
        const totalH = document.body.scrollHeight || document.documentElement.scrollHeight;
        const clientH = window.innerHeight || document.documentElement.clientHeight;
        const validH = totalH - clientH;
        const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollPercent = scrollH / validH;
        if (scrollPercent > 0.99) {

            if (scoll[1] > scrollH - 1) {
                window.scrollTo(scoll[0], scoll[1]- 0.02 * validH);
            }
            else{
                dispatch(getPost(currentPage + 1));
                setCurrentPage(flowingPostsPage);
            }
        }
    }


    const onClose = () => {
        setOpenPostDetail(-1);
        navigate("/moment");
    };

    useEffect(() => {

        dispatch(getPost(currentPage));

        setCurrentPage(flowingPostsPage);

    }, []);


    useEffect(() => {
        if (pathname === '/moment') {
            setOpenPostDetail(-1);
        }
    }, [pathname]);


    useEffect(() => {

        if (postOpen === -1) {
            window.scrollTo(scoll[0], scoll[1]);

            window.addEventListener("scroll", handleScroll);
        }
        else {
            window.removeEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [postOpen]);


    return (
      <div id="feedContainer">
          <PostContent
              postId = {postOpen}
              onClose = {onClose}
              postDetail = {postList.find((item) => (item.id==postOpen))}
          />
          <div style={(postOpen === -1 && pathname === '/moment') ? {}: {display: "none"}}>
              {loadingState ? <Skeleton active /> : (postList.length === 0 && <Empty description = "There are no posts from users you follow" />)}
          {

              postList
                  .filter((item, index, itself) => {
                      return itself.map((i) => i.id).indexOf(item.id) === index;
                  })
                  .map((item, index) => {
                    return (
                            <Posts
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
                                setOpen = {setOpenPostDetail}
                                saveScoll = {setScoll}
                            />
                    )
              })
          }
          </div>
      </div>
    );
};

export default Feed;
