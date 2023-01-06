import React from 'react';
import './NavHeader.css'

function NavHeader(props) {
    return (
        <>
            <div id="nav-header">
                <div className="box-nav"  onClick={() => {props.setSelected(0)}}>
                    <p id="nav">Posts</p>
                    {props.selected === 0 ? <div id="line"/> : null}
                </div>

                <div className="box-nav" onClick={() => {props.setSelected(1)}}>
                    <p id="nav">Articles</p>
                    {props.selected === 1 ? <div id="line"/> : null}
                </div>

                <div className="box-nav" onClick={() => {props.setSelected(2)}}>
                    <p id="nav">Media</p>
                    {props.selected === 2 ? <div id="line"/> : null}
                </div>

                <div className="box-nav" onClick={() => {props.setSelected(3)}}>
                    <p id="nav">Likes</p>
                    {props.selected === 3 ? <div id="line"/> : null}
                </div>
            </div>
        </>
    );
}

export default NavHeader;