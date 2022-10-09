import React, { useState } from "react";
import "./Feed.css";

import { BiArrowBack } from "react-icons/bi";
import { CgMoreAlt, CgCalendarDates } from "react-icons/cg";

import Tweet from "../tweet/tweet";

const Feed = () => {
  const [follow, setFollow] = useState(true);

  console.log(follow);

  const followHandler = () => {
    if (follow === true) {
      setFollow(false);
    } else if (follow === false) {
      setFollow(true);
    }
  };

  return (
    <div id="container-main">

        {/*<div id="box-top">*/}
        {/*  <span id="back-icon-box">*/}
        {/*    <BiArrowBack id="back-icon" />*/}
        {/*  </span>*/}

        {/*  <div id="box-top-right">*/}
        {/*    <p id="name-header">ali turkaman</p>*/}
        {/*    <span id="tweets-number">22 Tweets</span>*/}
        {/*  </div>*/}
        {/*</div>*/}



      <div id="nav-header">
        <div id="box-nav" className="box-Tweets">
          <p id="nav">Tweets</p>
        </div>

        <div id="box-nav" className="box-replies">
          <p id="nav">Tweets & replies</p>
        </div>

        <div id="box-nav" className="box-Media">
          <p id="nav">Media</p>
        </div>

        <div id="box-nav" className="box-Likes">
          <p id="nav">Likes</p>
        </div>
      </div>

      <div id="line"></div>

      <Tweet
        tweet="😎"
        likeNumber="25"
        comment="1"
      />
      <Tweet
        tweet="u"
        likeNumber="96"
        comment="5"
      />
      <Tweet
        tweet="122"
        likeNumber="60"
      />
      <Tweet
        tweet="333"
        likeNumber="60"
      />
      <Tweet tweet="222" likeNumber="60" />
      <Tweet
        tweet="1111"
        likeNumber="60"
      />
    </div>
  );
};

export default Feed;
