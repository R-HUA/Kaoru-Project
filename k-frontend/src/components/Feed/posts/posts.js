import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import "./posts.css";
import {LiaComment} from "react-icons/lia";
import {PiShare} from "react-icons/pi";
import { Image } from 'antd';
import {TbHeart,TbHeartFilled} from "react-icons/tb";
import {formatTime} from "../../../constant/times";
import axios from "axios";
import {UPDATE_POST_VIEW_URL} from "../../../constant/url";


export const PostImageArea = (props) => {
    const [imageClass, setImageClass] = React.useState("postImageContainer");


    // set style of image container based on number of images
    useEffect(() => {
        let imageCount = 0;
        for (let i = 0; i < props.images.length; i++) {
            if(props.images[i]){
                imageCount++;
            }
        }


        switch (imageCount) {
            case 0:
                return null;
            case 1:
                setImageClass( "postImageContainerSingle");
                break;
            default:
                setImageClass( "postImageContainer");

        }
    }, []);


    return (
        <div className={imageClass}>
            <Image.PreviewGroup >
                {props.images.map((item, index) => (
                    item ?
                        <Image
                            key={index}
                            src={item}
                            onClick={(e) => e.stopPropagation()}
                        />
                        : null
                ))}
            </ Image.PreviewGroup>
        </div>
    );

}


function Posts(props) {

    const [like, setLike] = React.useState(false);

    const paramsId = useParams().id;

    const navigate = useNavigate();


    useEffect(() => {
        // remove the text in the image mask after the component is mounted
        let maskInfoElements = document.getElementsByClassName("ant-image-mask-info");

        Array.from(maskInfoElements).forEach((element) => {
            element.innerText = " ";
        });

    }, []);


    const toDetial = () => {
        if (props.saveScoll && props.setOpen) {

            // update post viewCount
            axios.put(
                UPDATE_POST_VIEW_URL(props.id),
                {},
                {
                    headers: { "token": localStorage.getItem("token") }
                }
            ).then(response => {
                console.log("Updated post view count (" + response.data.code+ ")");
            }).catch(error => {
                console.log(error);
            });

            // save scroll position and open the post detail page
            props.saveScoll([window.scrollX,window.scrollY]);
            props.setOpen(props.id)

            navigate(`/moment/${props.id}`);
        }
    }



    return (
        <article className="post"  onClick={toDetial}>
            <div className="postingDetails" onClick={(e) => e.stopPropagation()}>
                <Link to={`/profile/${props.poster.id}`}>
                    <img className="posterImage" src={props.poster.avatar} alt="Poster"/>
                </Link>
                <div className="post-info">
                    <Link
                        to={`/profile/${props.poster.id}`}
                        className="posterName">
                        {props.poster.nickName}
                    </Link>
                    <p className="postingDate">
                        {paramsId ? props.postTime :formatTime(props.postTime)}
                    </p>
                </div>
            </div>
            <div className="post-content">
                {props.content}
            </div>

            {/* <div className="postImageContainer">
                <Image.PreviewGroup
                    // preview={{onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),}}
                >
                    <Image height={181} width={181}  src= {props.images[0]} />
                </Image.PreviewGroup>
            </div>*/}
            <PostImageArea images = {props.images}/>

{/*            <div className="engageLinks">
                <div className="engageLink">
                    <span className="material-icons-outlined engageLink">
                        <PiShare className="bottom-icon"/>
                    </span>
                    <p> </p>
                </div>

                <div className="engageLink">
                    <span className="material-icons-outlined engageLink">
                        <LiaComment/>
                    </span>
                    <p>{props.commentCount}</p>
                </div>

                <div className="engageLink" onClick={ () => {setLike(!like)} }>
                    <span className="material-icons-outlined engageLink" style={{paddingTop: "1px"}}>
                       {like ?  <TbHeartFilled/> : <TbHeart/>}
                    </span>
                    <p>{props.likeCount}</p>
                </div>
            </div>*/}

        </article>
    );
}

export default Posts;