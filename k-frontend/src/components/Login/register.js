import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {REGISTER_URL} from "../../constant/url";
import {Form, Input, Loading, MessageBox} from "element-react";
import "./login.css"
import {useDispatch, useSelector} from "react-redux";

function Register(props) {

    const navigate = useNavigate();

    const isLoading = useSelector(state => state.login.isLoading)

    const dispatch = useDispatch()

    const [form, setForm] = React.useState({
        username: '',
        pass: '',
        checkPass: '',
        email: '',
        nickName: '',
    });

    const formRef = React.useRef(null);

    const [rules, setRules] = React.useState({
        pass: [
            { required: true, message: 'Please enter password', trigger: 'blur' },
        ],
        checkPass: [
        { required: true, message: 'Please enter password again', trigger: 'blur' },

        ],
        username: [
        { required: true, message: 'Please enter your user name', trigger: 'blur' },
        ],
        email: [
        { required: true, message: 'Please enter email', trigger: 'blur' },
        ],
        nickName: [
        { required: true, message: 'Please enter your nick name', trigger: 'blur' },
        ]
    });

    const submitForm = (event) => {
        event.preventDefault();
        dispatch({type: 'LOADING'})

        formRef.current.validate((valid) => {
            if (valid) {
                axios.post(
                    REGISTER_URL,
                    {
                        "userName": form.username,
                        "nickName": form.nickName,
                        "email": form.email,
                        "password": form.pass
                    }
                ).then((respon) => {
                    if (respon.data.code === 200) {
                        dispatch({type: 'LOADED'})
                        MessageBox.alert('Register Success', 'Success').then(() => {
                            navigate('/login')
                        }).catch(() => {});
                    }
                    else{
                        dispatch({type: 'LOADED'})
                        MessageBox.alert(respon.data.msg, 'Error').then(() => {}).catch(() => {});
                    }

                }).catch(e => {
                    dispatch({type: 'LOADED'})
                    MessageBox.alert(e.message, 'Network Error').then(() => {}).catch(() => {});
                })

            } else {
                console.log('error submit!!');
                dispatch({type: 'LOADED'})
                return false;
            }
        });


    }
    
    const handleOnChange = (key) => (value) => {
        setForm({ ...form, [key]: value });

        setRules(
            {
                email: [
                    { required: true, message: 'Please enter email', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('Please enter email'));
                            } else {
                                callback();
                            }
                        } , trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: 'Please enter your nick name', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('Please enter your nick name'));
                            } else {
                                callback();
                            }
                        } , trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: 'Please enter password', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('Please enter password'));
                            } else {
                                if (form.checkPass !== '') {
                                    formRef.current.validateField('checkPass');
                                }
                                callback();
                            }
                        }, trigger: 'blur'  }
                ],
                checkPass: [
                    { required: true, message: 'Please enter password again', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('Please enter password again'));
                            } else if (value !== form.pass) {
                                console.log(form);
                                callback(new Error('Passwords do not match'));
                            } else {
                                callback();
                            }
                        } , trigger: 'blur' }
                ],
                username: [
                    { required: true, message: 'Please enter your user name', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('Please enter your user name'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' }
                ]
            }
        )
    }

    return (
        <div className="login-container">
            <Loading loading={isLoading}>
            <div className="login-box">
                <h3 className="title">Sign up</h3>

                <Form labelPosition="top" labelWidth="100" model={form} rules={rules} ref = {formRef}>
                    <Form.Item label="User Name" prop="username">
                        <Input value={form.username} onChange={handleOnChange("username")}></Input>
                    </Form.Item>
                    <Form.Item label="Nick Name" prop="nickName">
                        <Input value={form.nickName} onChange={handleOnChange("nickName")}></Input>
                    </Form.Item>
                    <Form.Item label="Email" prop="email">
                        <Input value={form.email} onChange={handleOnChange("email")}></Input>
                    </Form.Item>
                    <Form.Item label="Password" prop="pass">
                        <Input value={form.pass} type="password" onChange={handleOnChange("pass")}></Input>
                    </Form.Item>
                    <Form.Item label="Confirm Password" prop="checkPass">
                        <Input value={form.checkPass} type="password" onChange={handleOnChange("checkPass")}></Input>
                    </Form.Item>
                </Form>
                <div className="login-form">
                    <div>
                        <button className="login-button" onClick={submitForm}>Sign up</button>
                    </div>
                    <div>
                        <p>Already have an account?<Link to="/login">Log in</Link></p>
                    </div>
                </div>

            </div>
            </Loading>
        </div>
    );
}

export default Register;