import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "./posts.css";
import {LiaComment} from "react-icons/lia";
import {PiShare} from "react-icons/pi";
import { Image } from 'antd';
import {TbHeart,TbHeartFilled} from "react-icons/tb";

function Posts(props) {

    const [like, setLike] = React.useState(false);

    const [st, setSt] = React.useState(false);


    useEffect(() => {
        // 在组件渲染完成后执行的操作

        let maskInfoElements = document.getElementsByClassName("ant-image-mask-info");

        Array.from(maskInfoElements).forEach((element) => {
            element.innerText = " ";
        });

    }, []);











    return (
        <article className="post">
            <header className="postingDetails">
                <img className="posterImage" src="https://avatars.githubusercontent.com/u/50871883?v=4" alt="ProfileCard"/>
                <div className="post-info">
                    <Link
                        to={`/profile/tweets/`}
                        className="posterName">
                        {"username"}
                    </Link>
                    <p className="postingDate">
                        {"13 Jun"}
                    </p>
                </div>
            </header>
            <Link className="post-content" to={` `}>
                {"Acceptable file types can be specified with the accept attribute, which takes a comma-separated list of allowed file extensions or MIME types. Some examples:\n" +
                    "\n" +
                    "accept=\"image/png\" or accept=\".png\" — Accepts PNG files.\n" +
                    "accept=\"image/png, image/jpeg\" or accept=\".png, .jpg, .jpeg\" — Accept PNG or JPEG files."}
            </Link>
{/*            <div className="postImageContainer">
                <div  className="postImage">
                    <img src={"https://pbs.twimg.com/media/FziTsdeacAA2XtM?format=jpg&name=4096x4096"}/>
                </div>
                <div  className="postImage">
                    <img src={"https://avatars.githubusercontent.com/u/50871883?v=4"}/>
                </div>
            </div>*/}
            <div className="postImageContainer">
            <Image.PreviewGroup
                preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}>
                <Image height={181} width={181}  src="https://pbs.twimg.com/media/FziTsdeacAA2XtM?format=jpg&name=4096x4096" />
                <Image
                    width={181}
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                />
                <Image height={181} width={181}  src="https://pbs.twimg.com/media/FziTsdeacAA2XtM?format=jpg&name=4096x4096" />

            </Image.PreviewGroup>
            </div>

            <div className="engageLinks">
                <a className="engageLink">
                    <span className="material-icons-outlined engageLink">
                        <PiShare className="bottom-icon"/>
                    </span>
                </a>

                <a className="engageLink">
                    <span className="material-icons-outlined engageLink">
                        <LiaComment/>
                    </span>
                </a>

                <a className="engageLink" onClick={ () => {setLike(!like)} }>
                    <span className="material-icons-outlined engageLink" style={{paddingTop: "1px"}}>
                       {like ?  <TbHeartFilled/> : <TbHeart/>}
                    </span>
                </a>
            </div>

        </article>
    );
}

export default Posts;