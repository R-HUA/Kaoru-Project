import './style.css';
import Publishing from "../Publishing/Publishing";
import Feed from "../Feed/feed";
import {useState} from "react";

export default function Timelines() {

	const [newPost, setNewPost] = useState(null);

	return (
		<div id={"timelines-warp"}>
			<Publishing setNew = {setNewPost}/>
			<Feed newPost = {newPost}/>
		</div>
	)
}