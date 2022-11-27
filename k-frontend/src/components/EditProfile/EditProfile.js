import React from 'react';
import './EditProfile.css'
import {Button, message, Upload} from "antd";
import {useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";


export const UploadAvatar = (props) => {

    const beforeUpload = (file) => {
        const isImg = file.type.startsWith('image/')
        if (!isImg) {
            message.error('You can only upload image file!').then(r => {});
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!').then(r => {});
        }
        return false;
    };

    return (
        <div className = "root">


            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader image-circle"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
            >
                {props.image ? (
                    <img
                        src={props.image}
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
        </div>
)
}


function EditProfile(props) {


    let imageUrl = useSelector(state => state.user.avatar);


    return (
        <div className="edit-profile">



            <div className="profile-container">

                <div className="profile-header-image"></div>

                <div className="imgcontainer">
                    {/*                    <a href="profile.html" className="root" title="Profile photo">
                   <div className="image-circle" style={{width: 72, height: 72,}}>
                       <img className="image-size"
                            src="https://pbs.twimg.com/media/FzntfLCWAAAz89E?format=jpg&name=large"
                            alt=""/>
                   </div>
                   </a>*/}
                    <UploadAvatar image = {imageUrl}/>
                </div>

                <div className= "upload-group">

                    <Upload>
                        <div className="up-contain">
                            <button className="upload-button" style={{marginRight: "1.8vw"}}  > Edit avatar </button>
                        </div>
                    </Upload>
                    <Upload>
                        <div className="up-contain">
                            <button className="upload-button"> Edit background </button>
                        </div>
                    </Upload>
                </div>


                <ul className="list-column">
                    <li>
                        <div className="form-group">
                            <label htmlFor="fname">Nick Name: </label>
                            <input type="text" id="nickname" value="User "/>
                        </div>
                    </li>
                    <li>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" value="unimelb@example.com"/>
                        </div>
                    </li>
                    <li>
                        <div className="form-group">
                            <label htmlFor="sex">Gender: </label>
                            <input type="text" id="sex" value=""/>
                        </div>

                    </li>
                    <li>

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
                    </li>

                </ul>

                <div className="btn-container">
                    <button type="submit" id="submit-btn"> Submit</button>
                </div>


            </div>
        </div>
    );
}

export default EditProfile;