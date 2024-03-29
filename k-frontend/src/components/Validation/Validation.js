import axios from "axios";
import {USER_INFO_URL} from "../../constant/url";
import {useDispatch, useSelector} from "react-redux";
import React, {useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Loading} from "element-react";

function Validation() {

    const location = useLocation()

    const dispatch = useDispatch()

    const needLogin = useSelector(state => state.login.needLogin)

    const navigate = useNavigate();

    const token = localStorage.getItem('token')

/*    dispatch({type: 'LOGIN'});          //TODO: Remove this line
    navigate(location.pathname)*/


    React.useEffect(() => {
        if(token && !needLogin){
            dispatch({type: 'LOADING'})
            console.log("Validation");
            axios.get(
                USER_INFO_URL,
                {
                    headers: {
                        'token': token
                    }
                }
            ).then((respon) => {
                if (respon.data.code === 200) {
                    dispatch({type: 'LOGIN'})
                    dispatch({type: 'SET_USER_INFO', payload: respon.data.data})
                    dispatch({type: 'LOADED'})
                    navigate(location.pathname)
                }
                else{
                    dispatch({type: 'LOADED'})
                    console.log("Validation: failed");
                    navigate('/login')
                }
            }).catch(() => {
                dispatch({type: 'LOADED'})
                console.log("Validation: Network error");
                navigate('/login')
            })
            dispatch({type: 'NEED_LOGIN'})
        }
        else{
            navigate('/login')
        }
    })


    return (<Loading text="Loading" fullscreen={true} loading={true}/>);
}

export default Validation;