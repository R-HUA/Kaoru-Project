import React from "react";
import "./Publishing.css";
import {BiImage} from  "react-icons/bi";

export default function Publishing() {
	return (
		<>
			<div className="createTweet">
				<div className="InputArea">
					<img className="posterImage" src="" />
					<div className="tweetbox">
              			<textarea
							  placeholder="What’s happening?"
							  className="contentInput"
							  //onChange={this.handleNewTweet}
							  //onKeyDown={this.handleKeyDown}
							  maxLength="250"
			  			/>
						<img src="" width="100%" />
					</div>
				</div>
				<div className="newtweetIcons">
					<div className="img-upload">
					<label htmlFor="file-input">
						<i className="material-icons-outlined tweetImageIcon"> <BiImage/> </i>
					</label>
						<div className="popover" id="image-upload">
							<p>image</p>
							<p> </p>
							<div>
								<input
									type="file"
									accept="image"
									id="file-input"
									name="image-upload"
									//onChange={this.onImageChange}
								/>
							</div>
						</div>
					</div>
					<div>
						<p>
							<i className="material-icons-outlined">public</i>
							{"Everyone can reply"}
						</p>

							<div className="popover">
								<p>Who can reply?</p>
								<p>Choose who can reply to this.</p>
								<div>
									<a>
										<i className="material-icons-outlined">public</i>Everyone
									</a>
									<a>
										<i className="material-icons-outlined">group</i>People you
										follow
									</a>
								</div>
							</div>

					</div>
					<button id="tweetButton" //onClick={this.postTweet}
						 >
						Publish
					</button>
				</div>
			</div>
		</>
	)
}