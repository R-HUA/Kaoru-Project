import React, {useEffect} from 'react';
import axios from "axios";
import {LOGOUT_URL} from "../../constant/url";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Progress, Result} from "antd";

function Logout(props) {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [progress, Setprogress] = React.useState(1)

    useEffect(() => {
        axios.post(
            LOGOUT_URL,
            {
            },
            {
                headers: {
                    'token': localStorage.getItem('token')
                },
                onUploadProgress: (progress) => {
                    Setprogress(Math.floor(progress.loaded / progress.total) * 100);
                }
            },
        ).then((respon) => {
            if (respon.data.code === 200) {
                dispatch({type: 'LOGOUT'});
                localStorage.removeItem('token');
                navigate('/login');
            }
            else{Setprogress(-1);}
        }).catch((e) => {Setprogress(-1);})
    });



    return (
        <>
            {(progress > 0) ? <Progress percent={progress} showInfo={false} style={{marginTop: -10}}/> : <Result status="error" title="Logout Failed"/> }
        </>
    );
}

export default Logout;