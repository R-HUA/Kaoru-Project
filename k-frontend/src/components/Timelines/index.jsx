import './style.css';
import Publishing from "../Publishing/Publishing";
import Feed from "../Feed/feed";

export default function Timelines() {
	return (
		<div id={"timelines-warp"}>
			<Publishing />
			<Feed/>
		</div>
	)
}