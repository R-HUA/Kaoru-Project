import React, {useEffect} from 'react';
import './Home.css';
import {Link, NavLink} from "react-router-dom";
import UserLists from "../UserLists/UserLists";
import axios from "axios";
import {FOLLOWING_ARTICLE_URL, USER_LIST_URL} from "../../constant/url";
import {message} from "antd";
import {RightOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
function Home(props) {

    const [articleList, setArticleList] = React.useState([]);

    const [userList, setUserList] = React.useState([]);

    const [isUserListOpen, setIsUserListOpen] = React.useState(false);

    const following = useSelector(state => state.user.following);

    const content = {
        category: "Recommend",
        title: "Welcome to this site",
        description: (
        <>
            Thrilled to have you here. This is a place where you can connect with others, share ideas, and explore new perspectives.
        <br/> <br/> Follow the users who intrigue you to get their latest posts and articles. Here, you have the freedom to discover fascinating insights from a wide range of users - whether they're your friends, industry professionals, or individuals who share your interests.
        </>),
        linkText: "Discover Interesting Users",
        img: "https://www.unimelb.edu.au/__data/assets/image/0008/4684130/Unimelb-Voice-Banner-V2-.min.png",
        link: ""
    };

    const [mainContent, setMainContent] = React.useState(content);

    useEffect(() => {
        document.title = "Home | Kaoru";
        axios.get(
            FOLLOWING_ARTICLE_URL,
            {
                headers: {"token": localStorage.getItem("token"),}
            }
        ).then((respon) => {
            if (respon.data.code == 200) {
                setArticleList(respon.data.data);
            }
            else {
                message.error(respon.data.msg);
            }
        }).catch((error) => {
            message.error(error + '');
        });

        return () => {
            document.title = "Kaoru";
        };

    }, []);

    useEffect(() => {
        if (following && following.length > 2) {

            const initialContent = {
                category: "Recommend",
                title: "Mizuki Kaoru",
                description: "Understand more by watching our explainer videos, attending events, reading our stories or asking us a question.",
                linkText: "Visit our dedicated site",
                img: "https://rhua.file.core.windows.net/rhuafile/103251027_p1.png?sv=2022-11-02&ss=bfqt&srt=sco&sp=rf&se=2025-12-31T14:04:19Z&st=2023-06-22T07:04:19Z&spr=https&sig=TCtI%2BCoa4lth0H4BYS8hL6ew7QONt1NYZ%2B%2B7mCffiw4%3D",
                link: "http://www.xn--kaoru-xt2k158aoz2c.live"
            };

            //setMainContent(initialContent);
        }

    }, [following]);

    const onClickLink = (e) => {

        if(mainContent.link.length === 0){
            e.preventDefault();
            if (userList.length > 0) {
                setIsUserListOpen(true);
            }
            else {
                axios.get(
                    USER_LIST_URL(1),
                    {
                        headers: {"token": localStorage.getItem("token"),}
                    }
                ).then((respon) => {
                    if (respon.data.code == 200) {
                        setUserList(respon.data.data.rows);
                        setIsUserListOpen(true);
                    }
                    else {
                        message.error(respon.data.msg);
                    }
                }).catch((error) => {
                    message.error(error + '');
                });
            }
        }
    };


    return (
        <div className="section-alt__inner max">
            <h2 className="screenreaders-only">Featured articles</h2>
            <div className="card-article-large">
                <div className="card-article-large__inner">
                    <div className="card-article-large__content">
                        <h3 className="heading-md">{mainContent.title}</h3>
                        <p className="card-article-large__category">{mainContent.category}</p>
                        <p className="content-max-width">
                            {mainContent.description}
                        </p>
                        <div>
                            <a href={mainContent.link}
                               target="_blank"
                               className="btn--text btn"
                               rel="noreferrer"
                               onClick={onClickLink}
                            >
                                <span className="push-icon">
                                    {mainContent.linkText}
                                    <RightOutlined/>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="card-article-large__img">
                        <div className="progressive-image" style={{maxWidth: "100%"}}>
                            <a href={mainContent.link === "" ? "https://github.com/R-HUA/Kaoru-Project" : mainContent.link} target="_blank" rel="noreferrer">
                                <div className="progressive-image-wrapper" style={{paddingBottom: "67.5%"}}>
                                    <img
                                        src={mainContent.img}
                                        alt=""
                                        className="progressive-image-main"
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="article-card-list grid grid--lg">

            {articleList.map((article, index) => (
                    <div key = {article.id} className="article-card article-card-list__item cell cell--lg cell--tab-1of3 shim-mb0 shim-mt0">
                            <div className="article-card__inner border-top">
                                <h3 className="article-card__title heading-sm">
                                    <Link className="btn--text btn" to={"/article/" + article.id}>
                                        <span className="push-icon">
                                            {article.title}
                                        </span>
                                    </Link>
                                </h3>
                                <p className="article-card__category">
                                    { article.category ? article.category : 'Article'}
                                </p>
                            </div>
                    </div>
                ))
            }

            </div>



            <UserLists userList = {userList} isOpen = {isUserListOpen} setOpen = {setIsUserListOpen}/>
        </div>
    );
}

export default Home;