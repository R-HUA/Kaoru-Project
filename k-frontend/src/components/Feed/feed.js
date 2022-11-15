import React, { useState } from "react";
import "./Feed.css";
import Posts from "./posts/posts";
import { BiArrowBack } from "react-icons/bi";
import { CgMoreAlt, CgCalendarDates } from "react-icons/cg";

const Feed = () => {



  return (
    <div id="feedContainer">
      <Posts />

      <Posts />
    </div>
  );
};

export default Feed;
