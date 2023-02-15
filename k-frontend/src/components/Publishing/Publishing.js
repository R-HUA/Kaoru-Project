import React from "react";
import "./Publishing.css";
import {Button, Dialog, Dropdown, Input, Popover, Select, Upload} from "element-react";
import {BiImage, BiVideo} from "react-icons/bi";
import axios from "axios";
import {POST_URL, UPLOAD_URL} from "../../constant/url";
import Search from "antd/es/input/Search";
import {message, notification} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";


export default function Publishing(props) {

    const [imageList, setImageList] = React.useState([]);

    const [dialogImageUrl, setDialogImageUrl] = React.useState("");

    const [dialogVisible, setDialogVisible] = React.useState(false);

    const [conmentable, setConmentable] = React.useState("1");

    const [video, setVideo] = React.useState("");

    const [publishButtonDisabled, setPublishButtonDisabled] = React.useState(false);

    const inputAreaRef = React.useRef();

    const uploadRef = React.useRef();

    const pathname = useLocation().pathname;

    const handlehttpRequest = (req) => {
        req.onSuccess()
    };

    const handleRemove = (file, fileList) => {
        console.log(file, fileList);
    }

    const handlePreview = (file) => {
        setDialogImageUrl(file.url);
        setDialogVisible(true);
    }

    async function publishing() {
        try {
            let urlList = [];
            setPublishButtonDisabled(true);
            for (const file of imageList) {
                const formData = new FormData();
                formData.append("file", file.raw);
                await axios.post(UPLOAD_URL + encodeURIComponent(file.name), formData,{headers: {'token': localStorage.getItem('token')}})
                    .then((res) => {
                        console.log(res);
                        urlList.push(res.data.data);
                    });
            }
            await axios.post(
                POST_URL,
                {
                    content: inputAreaRef.current.value,
                    image1: urlList[0] ? urlList[0] : null,
                    image2: urlList[1] ? urlList[1] : null,
                    image3: urlList[2] ? urlList[2] : null,
                    video: video ? video : null,
                    status: "0",
                    isComment: conmentable,
                },
                {
                    headers: {'token': localStorage.getItem('token')}
                }
            ).then(
                (res) => {
                    // console.log(res)
                    if (res.data.code === 200) {
                        uploadRef.current.clearFiles();    // delete the uploaded files
                        setImageList([]);   // reset the image list
                        inputAreaRef.current.value = "";   // clear the input area
                        message.success("Post successfully");
                    }
                    else {
                        notification.error({message: "Post failed", description: res.data.msg});
                    }
                })
            setPublishButtonDisabled(false);
        } catch (error) {
            console.log(error);
            setPublishButtonDisabled(false);
            notification.error({
                message: "Network error",
                description: error.message,
            })
        }
    }

    function onSearch(value, event){
        message.warning("Not supported yet");
        setVideo(value);
    }

    return (
        <div style={ pathname === '/moment' ? {} : {display: "none"}}>
            <div className="createTweet">
                <div className="InputArea">
                    <div className="tweetbox">
              			<textarea
                            placeholder="What’s happening?"
                            className="contentInput"
                            ref={inputAreaRef}
                            onKeyDown={(e) => { e.target.style.height = `${e.target.scrollHeight}px`}}
                            maxLength="300"
                        />
                    </div>
                </div>
                <div className="newtweetIcons">
                    <div className="img-upload">
                            <Popover placement="bottom" width="339" trigger="click" content={(
                                <>
                                    <Upload
                                        ref = {uploadRef}
                                        className="img-uploader"
                                        limit={3}
                                        accept="image/*"
                                        listType="picture-card"
                                        httpRequest={handlehttpRequest}
                                        onChange={(file, fileList) => setImageList(fileList)}
                                        onPreview={(file) => handlePreview(file)}
                                        onRemove={(file, fileList) => handleRemove(file, fileList)}
                                    >
                                        <i className="el-icon-plus"></i>
                                    </Upload>
                                    <Dialog
                                        visible={dialogVisible}
                                        onCancel={() => setDialogVisible(false)}
                                    >
                                        <img width="100%" style={{margin: "-38px 0 -3px", zIndex:"-100", position: "relative"}} src={dialogImageUrl} alt=""/>
                                    </Dialog>
                                </>
                            )}>
                                <Button type="text"> <BiImage/> </Button>
                            </Popover>
                    </div>

                    <div className="img-upload">
                        <Popover placement="bottom" width="339" trigger="click" content={(
                            <>
                                <Search placeholder="Please enter video URL" onSearch={onSearch} />

                                {/*      <iframe
                                    style={{width: "100%"}}
                                    src="https://www.youtube.com/embed/"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>

                                </iframe>

                                <iframe
                                    style={{width: "100%"}}
                                    src="//player.bilibili.com/player.html?bvid=BV1Pk4y1T7RJ&page=1&autoplay=0"
                                    title="bilibili video player"
                                    allowFullScreen="true">
                                </iframe>*/}

                            </>
                        )}>
                            <Button type="text"> <BiVideo/> </Button>
                        </Popover>
                    </div>
                    <div className="permission">
                        <Dropdown onCommand={(e) =>(setConmentable(e))}
                            menu={(
                            <Dropdown.Menu style={{minWidth: "0", marginRight:"8%"}}>
                                <Dropdown.Item command="1">Allow</Dropdown.Item>
                                <Dropdown.Item command="0">Disable</Dropdown.Item>
                            </Dropdown.Menu>
                        )}>
                        <span className="el-dropdown-link">
                          {conmentable == "1" ? "Allow Comment": "Disable Comment"} <i className="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        </Dropdown>
                    </div>
                    <button className="publishButton" onClick={publishing} disabled={publishButtonDisabled}>
                        {publishButtonDisabled ? <LoadingOutlined /> : ""} Post
                    </button>
                </div>
            </div>
        </div>
    )
}



