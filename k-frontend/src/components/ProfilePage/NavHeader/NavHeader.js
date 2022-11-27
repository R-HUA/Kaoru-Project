import React from 'react';
import './NavHeader.css'

function NavHeader() {
    return (
        <>
            <div id="nav-header">
                <div className="box-nav" >
                    <p id="nav">Posts</p>
                    <div id="line"/>
                </div>

                <div className="box-nav" >
                    <p id="nav">Articles</p>
                </div>

                <div className="box-nav" >
                    <p id="nav">Media</p>
                </div>

                <div className="box-nav" >
                    <p id="nav">Likes</p>
                </div>
            </div>
        </>
    );
}

export default NavHeader;