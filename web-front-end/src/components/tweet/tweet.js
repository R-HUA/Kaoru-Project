import React, { useState } from "react";

import { CgMoreAlt } from "react-icons/cg";
import { SiGoogleanalytics } from "react-icons/si";
import { FiShare } from "react-icons/fi";
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const Tweet = (props) => {
  const [like, setLike] = useState(false);

  const likeHandler = () => {
    if (like === false) {
      setLike(true);
    } else if (like === true) {
      setLike(false);
    }
  };

  return (
    <div id="tweet-box">
      <div id="profile-tweet">
        <img
          src="https://avatars.githubusercontent.com/u/50871883?v=4"
          alt="profile"
          id="image-profile"
        />
      </div>

      <div id="box-tweet">
        <div id="name-id">
          <span id="flex-tweet">
            <p id="tweet-name">R-H</p>
            <p id="tweet-date">Aug 10</p>
          </span>

          <span id="span-more">
            <CgMoreAlt  />
          </span>
        </div>

        <div id="post-box">
          <p id="text-tweet"> {props.tweet} </p>
        </div>

        <div id="nav-bottom-post">
          <div id="box-comment-number">
            <span className="comment" id="nav-icon-box">
              <FaRegComment />
            </span>
              <p id="comment-tweet"> {props.comment} </p>
          </div>
          <span className="retweet" id="nav-icon-box">
            <AiOutlineRetweet />
          </span>
          <div id="box-like-number">
            <span onClick={likeHandler} className="like" id="nav-icon-box">
              {like === true ? (
                <AiFillHeart id="red-heart" />
              ) : (
                <AiOutlineHeart />
              )}
            </span>
            <spna id="like-number">
              {like === true  ? parseInt(props.likeNumber) + 1 : props.likeNumber}
            </spna>
          </div>
          <span className="share" id="nav-icon-box">
            <FiShare />
          </span>
          <span className="analytic" id="nav-icon-box">
            <SiGoogleanalytics />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
