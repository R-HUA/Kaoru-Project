import axios from "axios";
import {FOLLOWING_ARTICLE_URL} from "../constant/url";
import {message} from "antd";

export const getArticleListAction = (page) => {

    return (dispatch, getState) => {

        const state = getState();

        if (state.article.flowingArticlePage < page) {

            if (state.login.isLoading === false){

                for (let i = state.article.flowingArticlePage + 1; i <= page; i++){

                    if (i <= state.article.flowingArticleTotalPages){
                        dispatch({type: 'LOADING'})

                        axios.get(FOLLOWING_ARTICLE_URL + i,
                            {
                                headers: {
                                    "token": localStorage.getItem("token"),
                                }
                            }
                        ).then(response => {
                            if (response.data.code === 200) {
                                dispatch({type: 'FLOWING_ARTICLE_ADD_CONTENT', payload: response.data.data.rows});
                                dispatch({type: 'SET_FLOWING_ARTICLE_PAGE', payload: i});
                                dispatch({type: 'SET_FLOWING_ARTICLE_TOTAL_PAGES', payload: response.data.data.pages});
                            }
                            else {
                                message.open({
                                    type: 'error',
                                    content: 'Failed to get article: ' + response.data.msg,
                                });
                            }
                        }).catch(error => {
                            message.open({
                                type: 'error',
                                content: 'Failed to get article: ' + error,
                            });
                        }).finally(() => {
                            dispatch({type: 'LOADED'})
                        });
                    }
                }
            }
        }

    }
}