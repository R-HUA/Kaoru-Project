import axios from "axios";
import {FOLLOWING_POST_URL} from "../constant/url";

import {message} from 'antd';

export const getPost = (page) => {

    return (dispatch, getState) => {
        const state = getState();

        if (state.posts.flowingPostsPage < page) {

            for (let i = state.posts.flowingPostsPage + 1; i <= page; i++){
                if (state.posts.flowingPostsList.length < state.posts.flowingPostTotal){
                    dispatch({type: 'LOADING'})

                    axios.get(FOLLOWING_POST_URL + i,
                        {
                            headers: {
                                "token": localStorage.getItem("token"),
                            }
                        }
                    ).then(response => {
                        if (response.data.code === 200) {
                            dispatch({type: 'FLOWING_POSTS_ADD_CONTENT', payload: response.data.data.rows});
                            dispatch({type: 'SET_FLOWING_POSTS_PAGE', payload: i});
                            dispatch({type: 'SET_FLOWING_POSTS_TOTAL', payload: response.data.data.total});
                        }
                        else {
                            message.open({
                                type: 'error',
                                content: 'Failed to get posts: ' + response.data.msg,
                            });
                        }
                    }).catch(error => {
                        message.open({
                            type: 'error',
                            content: 'Failed to get posts: ' + error,
                        });
                    }).finally(() => {dispatch({type: 'LOADED'});});
                }
            }
        }

    }
}