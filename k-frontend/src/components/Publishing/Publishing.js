import React from "react";
import "./Publishing.css";
import {Button, Dialog, Dropdown, Input, Popover, Select, Upload} from "element-react";
import {BiImage, BiVideo} from "react-icons/bi";
import axios from "axios";
import {UPLOAD_URL} from "../../constant/url";
import Search from "antd/es/input/Search";


export default function Publishing() {

    const [image, setImage] = React.useState("");

    const [dialogImageUrl, setDialogImageUrl] = React.useState("");

    const [dialogVisible, setDialogVisible] = React.useState(false);

    const inputAreaRef = React.useRef();

    const uploadRef = React.useRef();

    const handlehttpRequest = (req) => {
        const url = URL.createObjectURL(req.file);
        setImage(url);
        req.onSuccess()
        console.log(url);
    };

    const handleRemove = (file, fileList) => {
        console.log(file, fileList);
    }

    const handlePreview = () => {
        setDialogImageUrl(image);
        setDialogVisible(true);
    }

    function publishing() {
        console.log(inputAreaRef.current.value);

        fetch(image)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "file.jpg", { type: "image/jpeg" })
                const formData = new FormData();
                formData.append("file", file);
                axios.post(UPLOAD_URL + "/file.jpg", formData)
                    .then((res) => {
                        console.log(res)
                    }).catch((err) => {console.log(err)});
            })
            .catch(err => {
            console.error(err)
            })

        uploadRef.current.clearFiles();    // delete the uploaded files
    }

    function onSearch(value, event){
        console.log(value, event);
    }

    return (
        <>
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
                                        action="https://127.0.0.1/"
                                        listType="picture-card"
                                        httpRequest={handlehttpRequest}
                                        onPreview={(file) => handlePreview(file)}
                                        onRemove={(file, fileList) => handleRemove(file, fileList)}
                                    >
                                        <i className="el-icon-plus"></i>
                                    </Upload>
                                    <Dialog
                                        visible={dialogVisible}
                                        size="tiny"
                                        onCancel={() => setDialogVisible(false)}>
                                        <img width="100%" src={dialogImageUrl} alt=""/>
                                    </Dialog>
                                </>
                            )}>
                                <Button type="text"> <BiImage/> </Button>
                            </Popover>
                    </div>

                    <div className="img-upload">
                        <Popover placement="bottom" width="339" trigger="click" content={(
                            <>
                                <Search placeholder="Please enter video URL" allowClear onSearch={onSearch} style={{ width: "100%" }} />

                                <iframe
                                    style={{width: "100%"}}
                                    src="https://www.youtube.com/embed/"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>

                                </iframe>

                                <iframe
                                    style={{width: "100%"}}
                                    src="//player.bilibili.com/player.html?bvid=BV1Pk4y1T7RJ&page=1"
                                    title="bilibili video player"
                                    allowFullScreen="true">
                                </iframe>

                            </>
                        )}>
                            <Button type="text"> <BiVideo/> </Button>
                        </Popover>
                    </div>
                    <div className="permission">
                        <Dropdown onCommand={(e) =>(console.log(e))}
                            menu={(
                            <Dropdown.Menu >
                                <Dropdown.Item command="Allow">Allow</Dropdown.Item>
                                <Dropdown.Item command="No">No</Dropdown.Item>
                            </Dropdown.Menu>
                        )}>
                        <span className="el-dropdown-link">
                          {"Allow comment"} <i className="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        </Dropdown>
                    </div>
                    <button id="publishButton" onClick={publishing}>
                        Post
                    </button>
                </div>
            </div>
        </>

    )
}



