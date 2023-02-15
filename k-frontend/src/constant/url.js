

const url1 = "https://www.xn--kaoru-xt2k158aoz2c.live/api"
const url2 = "http://172.16.16.157:8080"


export const WEB_URL = url1;

export const LOGIN_URL = WEB_URL + "/login";

export const LOGOUT_URL = WEB_URL + "/logout";

export const REGISTER_URL = WEB_URL + "/user";

export const USER_INFO_URL = WEB_URL + "/user";

export const USER_POST_URL = (userId,pageNum) => (`${WEB_URL}/postList/${userId}/${pageNum}`);

export const UPLOAD_URL = WEB_URL + "/file/";

export const FOLLOWING_POST_URL = WEB_URL + "/postList/following/";

export const POST_URL = WEB_URL + "/post";

export const ARTICLE_CONTENT_URL = WEB_URL + "/article/"

export const USER_ARTICLE_URL = (userId,pageNum) => (`${WEB_URL}/article/articleList/${userId}/${pageNum}`);

export const FOLLOWING_ARTICLE_URL = WEB_URL + "/article/articleList/";

export const NEW_ARTICLE_URL = WEB_URL + "/article";

export const DRAFT_LIST_URL = WEB_URL + "/article/articleList/draft/";

export const DRAFT_URL = WEB_URL + "/article/draft/";

export const ARTICLE_REPLY_URL = (articleId, pageNum) => (`${WEB_URL}/article/replyList/${articleId}/${pageNum}`);

export const POST_REPLY_URL = (postid, pageNum) => (`${WEB_URL}/post/replyList/${postid}/${pageNum}`);

export const CHILD_COMMENT_URL = (rootID) => `${WEB_URL}/reply/${rootID}/children`;

export const ADD_COMMENT_URL =  WEB_URL + "/reply/";

export const FOLLOWER_URL = WEB_URL + "/follower/"

export const FOLLOWING_URL = WEB_URL + "/following/"

export const FOLLOW_URL = WEB_URL + "/follow/"

export const UPDATE_POST_VIEW_URL = (postId) => `${WEB_URL}/post/${postId}/view`;


export const USER_LIST_URL = (pageNum) => (`${WEB_URL}/user/userList/${pageNum}`);