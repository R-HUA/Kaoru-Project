import React, {useEffect, useRef, useState} from 'react';
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./NewArticle.css";
import "../Article/Article.css";
import {Button, Menu, Radio, Upload, Input, message, Avatar, List, Divider, Skeleton} from 'antd';
import {RiDeleteBinLine} from "react-icons/ri";
import {CloudUploadOutlined} from "@ant-design/icons";
import axios from "axios";
import {ARTICLE_CONTENT_URL, DRAFT_LIST_URL, DRAFT_URL, NEW_ARTICLE_URL, UPLOAD_URL} from "../../constant/url";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from "react-router-dom";


const { Dragger } = Upload;

const uploadArea = (
    <div className="upload-area">
        <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
        </p>
        <p className="ant-upload-text">Add Thumbnail (Optional)</p>
        <p className="ant-upload-hint">
            Support high-definition images in various formats such as JPG, JPEG, BMP, and PNG.
        </p>
    </div>
)

export function ImgPreview(props) {
    return (
        <div className="img-preview">
            <img src = {props.imageURL} alt ="upload"  style = {{width: '100%',}}/>
            <Button type="primary" shape="circle" icon={<RiDeleteBinLine />} size={"small"} onClick={props.delete} />
        </div>
    )
}

export function DraftList(props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(Infinity);
    const loadMoreData = () => {
        console.log(loading);
        if (loading) {
            return;
        }
        setLoading(true);
        const next = currentPage + 1;
        axios.get(
            DRAFT_LIST_URL + next,
            {headers: {'token': localStorage.getItem('token')}}
        ).then((response) => {
            if (response.data.code === 200) {
                setData([...data, ...response.data.data.rows]);
                setCurrentPage(next);
                setTotalPage(response.data.data.pages);
            }
            else{
                message.error(response.data.msg);
            }
        }).catch((error) => {
            message.error(error + '');
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <div className="newpage" style={{width: "100%"}}>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={currentPage < totalPage}
                loader={
                    <Skeleton
                        paragraph={{rows: 1,}}
                        active
                    />
                }
                endMessage={<Divider plain>It is all, nothing more</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    itemLayout="vertical"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            extra={
                                item.thumbnail && <img height={70} src={item.thumbnail} alt="thumbnail"/>
                            }
                            style={{cursor: "pointer", padding:"12px 5% 0px"}}
                            onClick={() => {props.onSelected(item.id)}}
                        >
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={item.summary}
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
}


function NewArticle() {

    const [vd, setVd] = React.useState(null);

    const [image, setImage] = useState(new File([], ""))

    const [imageURL, setImageURL] = React.useState()

    const contentRef = useRef("");

    const titleRef = useRef();

    const [currentNav, setCurrentNav] = React.useState('new');

    const [summary, setSummary] = React.useState("");

    const [commentable, setCommentable] = React.useState(1);

    const [draftId, setDraftId] = React.useState(-1);

    const navigate = useNavigate();

    const initialize = () => {
        const vditor = new Vditor("vditor", {
            after: () => {
                vditor.setValue(contentRef.current);
                setVd(vditor);
            },
            minHeight: 600,
            width: "100%",
            lang: "en_US",
            input: (value) =>{
                contentRef.current = value;
            },
        });
    }

    const LoadDraft = (id) => {
        axios.get(
            DRAFT_URL + id,
            {headers: {'token': localStorage.getItem('token')}}
        ).then((response) => {
            if (response.data.code === 200) {
                setDraftId(response.data.data.id);
                titleRef.current.value = response.data.data.title;
                setSummary(response.data.data.summary);
                setImageURL(response.data.data.thumbnail);
                setImage(new File([], ""));
                setCommentable(parseInt(response.data.data.isComment));
                contentRef.current = response.data.data.content;
                vd.setValue(contentRef.current);
                setCurrentNav('new');
            }
            else{
                message.error(response.data.msg);
            }
        }).catch((error) => {
            message.error(error + '');
        });
    }

    React.useEffect(() => {
        initialize();
    }, []);


    const uploadProp = {
        name: 'file',
        listType: "picture-card",
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        action: 'https://',
        beforeUpload: (file) => {
            if (file.type.startsWith('image/')){
                setImageURL(URL.createObjectURL(file));
                setImage(file);
            }
            return false;
        },
        onDrop(e) {
        },
    };

    const deleteImage = (e) => {
        e.stopPropagation();
        setImageURL(null);
        setImage(new File([], ""));
    }

    const navItems = [
        {
            label: 'New Article',
            key: 'new',
        },
        {
            label: ' Drafts ',
            key: 'draft',
        },
    ];

    const onClickNav = (e) => {
        setCurrentNav(e.key);
    }


    async function handlePublish(status) {
        setCurrentNav("Loading");

        let thumbnail = imageURL;

        try{
            if (image.size > 0 && typeof imageURL === 'string' && imageURL.startsWith('blob:')) {
                const formData = new FormData();
                formData.append("file", image);
                await axios.post(
                    UPLOAD_URL + encodeURIComponent(image.name),
                    formData,
                    {headers: {'token': localStorage.getItem('token')}}
                ).then((res) => {
                    if (res.data.code === 200) {
                        setImageURL(res.data.data);
                        thumbnail = res.data.data;
                    }
                    else {
                        throw new Error(res.data.msg || res.data);
                    }
                });
            }


            await (draftId > 0 ? axios.put : axios.post)(
                NEW_ARTICLE_URL,
                {
                    id: draftId > 0 ? draftId : null,
                    title: titleRef.current.value,
                    content: contentRef.current,
                    summary: summary,
                    thumbnail: thumbnail,
                    isComment: commentable.toString(),
                    status: status,
                },
                {headers: {'token': localStorage.getItem('token')}}
            ).then((res) => {
                if (res.data.code === 200) {
                    message.success('Article Saved');
                    setImageURL(null);
                    setImage(new File([], ""));
                    setSummary("");
                    contentRef.current = "";
                    titleRef.current.value = "";
                    initialize();
                    if (status === 0) {
                        console.log(res.data);
                        navigate("/article/" + res.data.data);
                    }
                    else {
                        setCurrentNav("draft");
                    }
                }
                else {
                    throw new Error(res.data.msg || res.data);
                }
            });

        }
        catch (e) {
            console.log(e);
            message.error(e.message);
        }
    }

    const pageStyle = React.useMemo(() => {
        switch(currentNav) {
            case "new":
                return {};
            case "draft":
                return { display: "none" };
            default:
                return { pointerEvents: "none" };
        }
    }, [currentNav]);


    return (
        <div className="selection-container">
        <Menu onClick={onClickNav} selectedKeys={[currentNav]} mode="horizontal" items={navItems} />
            <div className="new-article-container">

                <div className="newpage" style={pageStyle}>

                    <div className="page-title">
                        <input name="title"  ref = {titleRef} placeholder= "Please enter the title"/>
                    </div>


                    <div id="vditor" className="vditor" />

                    <div>
                        <div className= {"article-upload"}
                        >
                            <Dragger {...uploadProp}>
                                { imageURL ? <ImgPreview imageURL = {imageURL} delete = {deleteImage}/> : uploadArea}
                            </Dragger>
                        </div>

                        <div className="other-setttings">
                            <h3>Please enter the summary (Optional)</h3>
                            <Input.TextArea
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="Summary"
                                allowClear
                                autoSize={{
                                    minRows: 2,
                                    maxRows: 4,
                                }}
                            />
                        </div>
                        <div className="other-setttings">
                            <h3>Set enable or disable comments</h3>
                            <Radio.Group onChange={(e) => {setCommentable(e.target.value)}} value={commentable}>
                                <Radio value={1}>Enable</Radio>
                                <Radio value={0}>Disable</Radio>
                            </Radio.Group>
                        </div>
                        <div className="article-buttons">
                            <Button shape="round" size={"large"} onClick={() => {handlePublish(1)}}>Save  Draft</Button>
                            <Button type="primary" shape="round" size={"large"} onClick={() => {handlePublish(0)}}>Submit Article</Button>
                        </div>
                    </div>


                </div>

                {currentNav === "draft" && <DraftList onSelected = {LoadDraft}/>}

            </div>
        </div>
    );
}

export default NewArticle;