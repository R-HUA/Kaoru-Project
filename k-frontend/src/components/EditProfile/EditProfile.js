import React from 'react';
import './EditProfile.css'
import {Button, message, Upload} from "antd";
import ImgCrop from 'antd-img-crop';
import {useDispatch, useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";
import {userInitialState} from "../../reducers/userReducer";
import axios from "axios";
import {USER_INFO_URL} from "../../constant/url";
import {useNavigate} from "react-router-dom";


export const UploadAvatar = (props) => {

    const {image, setImage, handleBeforeUpload} = props;

    return (
        <div className = "upload-root">

            <ImgCrop rotationSlider>
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader image-circle"
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload(setImage)}
                >
                    {image.url ? (
                        <img
                            src={image.url}
                            alt="avatar"
                            className="image-size"
                            style={{
                                width: '100%',
                            }}
                        />
                    ) : (
                        <div>
                             <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    )}
                </Upload>
            </ImgCrop>
        </div>
    )
}


function EditProfile(props) {


    const [avatar, setAvatar] = React.useState({url: useSelector(state => state.user.avatar)});

    const [cover, setCover] = React.useState({url: useSelector(state => state.user.headerImg)});

    const [nickName, setNickName] = React.useState(useSelector(state => state.user.nickName));

    const storeSignature = useSelector(state => state.user.signature);

    const navigate = useNavigate();

    const [signature, setSignature] = React.useState(storeSignature === userInitialState.signature ? "" : storeSignature);

    const [email, setEmail] = React.useState(useSelector(state => state.user.email));

    const [phone, setPhone] = React.useState(useSelector(state => state.user.phone));

    const dispatch = useDispatch();


    const handleBeforeUpload = (setImage) => (file) => {
        const isImg = file.type.startsWith('image/')
        if (!isImg) {
            message.error('You can only upload image file!').then(r => {});
        }
        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isLt4M) {
            message.error('Image must smaller than 4MB!').then(r => {});
        }

        setImage({file: file, url: URL.createObjectURL(file)});
        return false;
    }

    function handleUpload() {

        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("header", cover.file);
        formData.append("nickName", nickName);
        formData.append("signature", signature);
        formData.append("email", email);
        formData.append("phone", phone);

        console.log(nickName, signature, email, phone);

        axios.put(
            USER_INFO_URL,
            formData,
            {
                headers: {
                    "token": localStorage.getItem("token"),
                }
            }
        ).then(response => {
            console.log(response.data)
            if (response.data.code === 200) {
                message.success("Update successfully").then(r => {});
                dispatch({type: 'SET_USER_INFO', payload: response.data.data});
                navigate("/profile/" + response.data.data.id)
            }
            else {
                message.error("Update failed: " + response.data.msg || response.data).then(r => {});
            }
        }).catch(error => {
            message.error("Update failed: " + error).then(r => {});
        })

    }



    return (
        <div className="edit-profile">

            <div className="profile-container">

                <div className="profile-header-image"   style={{backgroundImage: `url(${cover.url})`,}}/>


                <div className="imgcontainer">
                    {/*                    <a href="profile.html" className="root" title="Profile photo">
                   <div className="image-circle" style={{width: 72, height: 72,}}>
                       <img className="image-size"
                            src="https://pbs.twimg.com/media/FzntfLCWAAAz89E?format=jpg&name=large"
                            alt=""/>
                   </div>
                   </a>*/}
                    <UploadAvatar image = {avatar} setImage = {setAvatar} handleBeforeUpload = {handleBeforeUpload}/>
                </div>

                <div className= "upload-group">

                    <ImgCrop rotationSlider>
                        <Upload showUploadList={false} beforeUpload = {handleBeforeUpload(setAvatar)}>
                            <div className="up-contain">
                                <button className="upload-button" style={{marginRight: "1.8vw"}}  > Edit avatar </button>
                            </div>
                        </Upload>
                    </ImgCrop>

                    <Upload showUploadList={false} beforeUpload = {handleBeforeUpload(setCover)}>
                        <div className="up-contain">
                            <button className="upload-button"> Edit background </button>
                        </div>
                    </Upload>
                </div>


                <ul className="list-column">
                    <li>
                        <div className="form-group">
                            <label htmlFor="fname">Nick Name: </label>
                            <input type="text" id="nickname" value={nickName} onChange={(event) => {setNickName(event.target.value)}}/>
                        </div>
                    </li>
                    <li>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                        </div>
                    </li>
                    <li>
                        <div className="form-group">
                            <label htmlFor="signature">Signature: </label>
                            <input type="text" id="signature" value={signature} onChange={(event) => {setSignature(event.target.value)}}/>
                        </div>

                    </li>
                    <li>
                        <div className="form-group">
                            <label htmlFor="phone">Phone: </label>
                            <input type="tel" id="phone" value={phone} onChange={(event) => {setPhone(event.target.value)}}/>
                        </div>

                    </li>



{/*                    <li>

                        <div className="form-group">
                            <label htmlFor="phone">Password: </label>
                            <input type="password" id="reg-password" placeholder="Password"/>
                        </div>

                    </li>

                    <li>
                        <div className="form-group">
                            <label htmlFor="phone">Confirm: </label>
                            <input type="password" id="reg-confirm-password" placeholder="Confirm Password"/>
                        </div>
                    </li>*/}

                </ul>

                <div className="btn-container">
                    <button id="submit-btn" onClick={handleUpload} > Submit</button>
                </div>


            </div>
        </div>
    );
}

export default EditProfile;