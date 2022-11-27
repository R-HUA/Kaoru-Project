import React, {useRef, useState} from 'react';
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./NewArticle.css";
import "../Article/Article.css";
import { Button, Upload } from 'antd';
import {RiDeleteBinLine} from "react-icons/ri";
import {CloudUploadOutlined} from "@ant-design/icons";


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




function NewArticle() {

    const [vd, setVd] = React.useState(null);

    const [image, setImage] = useState(new File([], ""))

    const [imageURL, setImageURL] = React.useState()

    const contentRef = useRef("");

    const titleRef = useRef();

    React.useEffect(() => {
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
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const deleteImage = () => {
        setImageURL(null);
        setImage(new File([], ""));
    }



    return (
        <div className="new-article-container">
            <div className="newpage">

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

                    <div className="article-buttons">
                        <Button shape="round" size={"large"} onClick={() => {}}>Save  Draft</Button>
                        <Button type="primary" shape="round" size={"large"} onClick={() => {}}>Submit Article</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewArticle;