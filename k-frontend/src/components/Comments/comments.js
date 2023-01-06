import React, {useEffect} from 'react';
import {Comment} from "@ant-design/compatible";
import {Avatar, Button, Form, List, message, Skeleton} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import {ADD_COMMENT_URL, CHILD_COMMENT_URL, ARTICLE_REPLY_URL, POST_REPLY_URL} from "../../constant/url";
import {useSelector} from "react-redux";
import {formatTime} from "../../constant/times";
import "./comments.css"
import {REPLY_TYPE_ARTICLE, REPLY_TYPE_POST} from "../../constant/types";


const Editor = (props) => {

    const [newReply, setNewReply] = React.useState("");

    const [submitting, setSubmitting] = React.useState(false);

    const userInfo = useSelector(state => state.user);

    const {rootID,repliedId,toCommentUserId,toCommentId, afterSubmit, type} = props;

    function onSubmit() {

        axios.post(ADD_COMMENT_URL, {
                content: newReply,
                rootId: rootID,
                repliedId: repliedId,
                toCommentUserId: toCommentUserId,
                toCommentId: toCommentId,
                type: type,
            }, {
                headers: {
                    "token": localStorage.getItem("token"),
                }
            }).then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                    setNewReply("");
                    const newComment = {...res.data.data, userAvatar: userInfo.avatar, username: userInfo.nickName, children: []};
                    afterSubmit(newComment);
                }
                else {
                    message.error("Reply Failed: " + res.data.msg);
                }
            }).catch((error) => {
                message.error(error.message);
            }).finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <Comment
            avatar={<Avatar src={userInfo.avatar} alt={userInfo.nickName} />}
            content={
            <Form layout = "inline">
                <Form.Item style ={{width: "70%"}}>
                    <TextArea autoSize={{minRows: 2, maxRows: 3}} onChange={(e) => {setNewReply(e.target.value)}} value={newReply} maxLength={400} />
                </Form.Item>
                <Form.Item style ={{width: "20%"}}>
                    <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style ={{height: "100%"}}>
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
            }
        />
    )
};

function Comments(props) {

    const [comments, setComments] = React.useState([]);

    const [replyID, setReplyID] = React.useState(-1);

    const [commentPage, setCommentPage] = React.useState(0);

    const [isLoding, setIsLoding] = React.useState(false);

    const [totalPage, setTotalPage] = React.useState(Infinity);

    const [commentCount, setCommentCount] = React.useState(props.commentsCount);

    function updateCount() {
        setCommentCount(commentCount + 1);
    }

    function addNewComment(newComment) {
        setComments([newComment, ...comments]);
        updateCount();
    }

    function countComments(commentList) {
        let count = 0;
        commentList.forEach((item) => {
            count += 1;
            count += item.children ? countComments(item.children): 0;
        });
        return count;
    }

    function getChildren(id) {

        if (!isLoding) {
            setReplyID(-1);
            setIsLoding(true);

            axios.get(CHILD_COMMENT_URL(id), {
                headers: {
                    "token": localStorage.getItem("token"),
                }
            }).then((respon) => {
                if (respon.data.code == 200) {
                    setComments(
                        comments.map((item) => {
                            if (item.id == id) {
                                return {...item, children: respon.data.data};
                            }
                            else {
                                return item;
                            }
                        })
                    )
                }
                else {
                    message.error("Failed to load more: " + respon.data.msg);
                }
            }).catch((error) => {
                message.error("Network Error");
            }).finally(() => {
                setIsLoding(false);
            })
        }
    }


    function mapCommentsComponent(commentList) {

        return commentList.map((item) => {

            return (
                <li key={item.id}>
                    <Comment
                        actions={[
                            <span>{formatTime(item.createTime)}</span>,
                            <span key="comment-list-reply-to-0" onClick={() => {setReplyID(item.id)}}>Reply</span>
                        ]}
                        author={item.username}
                        avatar={<Avatar src={item.userAvatar} alt={item.username} />}
                        content={item.content}
                    >
                    {replyID === item.id && <Editor rootID = {item.id} repliedId = {props.articleId} toCommentUserId = {item.createBy} toCommentId = {item.id} type={props.type} afterSubmit = {(e) => {getChildren(item.id);  updateCount();}}/>}
                    {
                        item.children.map((childItem) => (
                            childItem == null
                                ? <Button type="link" onClick={() => {getChildren(item.id)}}>view more</Button>
                                : <>
                                    <Comment
                                        key={childItem.id}
                                        actions={[<span>{formatTime(childItem.createTime)}</span>,
                                            <span key="comment-list-reply-to-0" onClick={() => {setReplyID(childItem.id)}}>Reply</span>
                                        ]}
                                        author={childItem.username}
                                        avatar={<Avatar src={childItem.userAvatar} alt={childItem.username} />}
                                        content={childItem.content}
                                    >
                                    </Comment>
                                    {replyID === childItem.id && <Editor rootID = {item.id} repliedId = {props.articleId} toCommentUserId = {childItem.createBy} toCommentId = {childItem.id} type={props.type} afterSubmit = {(e) => {getChildren(item.id); updateCount();}}/>}
                                  </>


                        ))
                    }

                    </Comment>
                </li>
            )
        });
    }

    function getComments(pageNum) {

        if (pageNum && pageNum <= commentPage) {
            return;
        }

        let urlFunc;

        switch (props.type) {
            case REPLY_TYPE_ARTICLE:
                urlFunc = ARTICLE_REPLY_URL;
                break;
            case REPLY_TYPE_POST:
                urlFunc = POST_REPLY_URL;
                break;
            default:
                return;
        }

        if (!isLoding && commentPage < totalPage) {
            setIsLoding(true);
            const nextPage = commentPage + 1;
            axios.get(urlFunc(props.articleId, nextPage), {
                headers: {
                    "token": localStorage.getItem("token"),
                }
            }).then((respon) => {
                if (respon.data.code == 200) {
                    console.log(respon.data.data);
                    const newComments = [...comments, ...respon.data.data.rows].filter((v,i,a)=> (a.map(mapObj => mapObj['id']).indexOf(v['id'])===i));
                    setComments(newComments);
                    setCommentPage(nextPage);
                    setTotalPage(respon.data.data.pages);

                    const count = countComments(newComments);
                    if (commentCount < count){
                        setCommentCount(count);
                    }
                }
                else {
                    message.error("Failed: " + respon.data.msg)
                }
                setIsLoding(false);
            }).catch(() => {

                message.error("Network Error: Failed to Load Comments")
                setIsLoding(false);
            });
        }



    }

    useEffect(() => {getComments(1);}, [props.articleId]);


    if (props.articleId == -1) {
        return <div/>
    }


    return (
        <div style={{margin: "1.5vw"}}>
            <List
                className="comment-list"
                itemLayout="horizontal"
                loadMore={(commentPage < totalPage && !isLoding && comments.length > 0) && <div onClick={getComments} className="comment-loadmore">Load More</div>}
                header={`${commentCount} replies`}
                size="large"
                dataSource={[
                    <Editor
                        rootID = {-1}
                        repliedId = {props.articleId}
                        toCommentUserId = {-1}
                        toCommentId = {-1}
                        afterSubmit = {addNewComment}
                        type={props.type}
                    />,
                    ...(mapCommentsComponent(comments)),
                    isLoding && <Skeleton avatar title={false} loading={true} style={{marginTop: 20}} active/>
                ]}
                renderItem={(item) => (item)}
            />
        </div>
    );
}

export default Comments;