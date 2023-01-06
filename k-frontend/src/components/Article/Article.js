import React, {useEffect} from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./Article.css"
import Comments from "../Comments/comments";
import {useParams} from "react-router-dom";
import axios from "axios";
import {ARTICLE_CONTENT_URL, ARTICLE_REPLY_URL} from "../../constant/url";
import {message, Skeleton} from "antd";
import {REPLY_TYPE_ARTICLE} from "../../constant/types";


function Article(props) {


    const [ArticlId, setArticlId] = React.useState(useParams().id);

    const [article, setArticle] = React.useState({
        id: -1,
        title: " ",
        thumbnail: "",
        content: "  Loading...",
        categoryId: -1,
        viewCount: 0,
        commentCount: 0,
        createTime: "2020-01-01 10:00:00",
    });

    useEffect(() => {
        if (article.id === -1){
            axios.get(
                ARTICLE_CONTENT_URL + ArticlId,
                {
                    headers: {
                        "token": localStorage.getItem("token"),
                    }
                }
            ).then(response => {
                if (response.data.code === 200) {
                    setArticle(response.data.data);
                }
                else {
                    message.error("Error: " + response.data.msg)
                }
            }).catch(error => {
                message.error("" + error)
            })
        }

    }, [ArticlId]);

    console.log(article);

    if (article.id === -1) {
        return (
            <div className="article-container">
                <div className="markdown-body">
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                </div>
            </div>
        )
    }


    return (
        <div className={"article-container"}>
            {/* <span id="back-icon-box">
                <BiArrowBack id="back-icon" onClick={() => {window.history.back();}}/>
            </span> */}

            <div className="page-title">
                <h1 className="article-title">{article.title}</h1>
                <div className="article-meta">
                    <div className="first-meta">
                        <span>
                            <span className="text">{article.createTime}</span>
                        </span>
                        <span>
                            <span className="text">{article.viewCount} views</span>
                        </span>
                        <span>
                            {/*<span className="text">2 喜欢</span>*/}
                        </span>
                        <span>
                            <span className="text">{article.commentCount} comments</span>
                        </span>
                    </div>
                    <div className="second-meta"></div>
                </div>

                { article.thumbnail && <div className="article-thumbnail"> <img src={article.thumbnail} alt=""/> </div> }
            </div>

            <ReactMarkdown
                className={"markdown-body"}
                children={article.content}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={oneLight}
                                language={match[1]}
                                PreTag="div"
                            />
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            />


            <Comments articleId = {article.id} commentsCount={article.commentCount} type={REPLY_TYPE_ARTICLE}/>

        </div>
    );
}

export default Article;