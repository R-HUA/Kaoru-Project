import React, {useRef} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {LOGIN_URL, USER_INFO_URL} from "../../constant/url";
import "./login.css"
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import { notification } from 'antd';
import { Loading } from "element-react";

function Login(props) {

    const dispatch = useDispatch()

    const usernameRef = useRef()

    const passwordRef = useRef()

    const [remeberMe, setRemeberMe] = React.useState(true)

    const isLoading = useSelector(state => state.login.isLoading)

    const needLogin = useSelector(state => state.login.needLogin)

    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    const openNotification = (title,msg) => {
        notification.open({
            placement: 'topRight',
            message: title,
            description: msg,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };




    const handleChange = (e) => {
        const {name} = e.target;

        if(name === 'remeberMe') {
            setRemeberMe(!remeberMe);
        }

    }

    const submitForm = (event) => {

        event.preventDefault();
        dispatch({type: 'LOADING'})

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        axios.post(
            LOGIN_URL,
            {
                "userName": username,
                "password": password,
            }
        ).then((respon) => {
            const data = respon.data;
            if (data.code === 200) {
                const token = data.data.token;
                const userInfo = data.data.userInfo;
                if (remeberMe) {
                    localStorage.setItem('token', token);
                }
                dispatch({type: 'LOGIN'})
                dispatch({type: 'SET_USER_INFO', payload: userInfo})
                dispatch({type: 'LOADED'})
                navigate('/')
            }
            else{
                openNotification('Login Failed', data.msg);
                dispatch({type: 'LOADED'})
            }
        }).catch(e => {
            openNotification('Network Error', null);
            dispatch({type: 'LOADED'})
        })
    }

    return (
        <Loading loading={isLoading}>
        <div className="login-container">
            <div className="login-box">
                <h3 className="title">Login</h3>
                <form className="login-form" method="post">
                    <div>
                        <label>User Name</label>
                        <input name="username" type="text" ref={usernameRef} placeholder="Please Enter Username" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" type="password" ref={passwordRef} placeholder="Please Enter Password" />
                    </div>
                    <div>
                        <div style={{paddingTop: 15}}>


                        <label className={`checkbox ${remeberMe ? 'checked':''}`} style={{padding: 0, marginTop:0}}>
                            <input name="remeberMe" type="checkbox" checked={remeberMe} onChange={handleChange} />
                        </label>

                        <span> Remeber Me</span>

                        </div>

                    </div>
                    <div>
                        <button className="login-button" onClick={submitForm}>Log in</button>
                    </div>
                    <div>
                        <p>Don't have an account?<Link to="/register">Sign Up</Link></p>
                    </div>
                </form>

            </div>
        </div>
        </Loading>
    );
}

export default Login;