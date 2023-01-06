import React from 'react';
import './Notfound.css'

function NotFound(props) {

    const h1Style = {
        padding: "3rem 1.25rem 2.25rem 0",
        textAlign: "left",
        textTransform: "none",
        width: "94%",
        fontSize: "2.625rem",
        lineHeight: "3rem",
        fontWeight: "bold",
    }


    return (
        <div className='not-found'>


            <h1 style={h1Style}>Page not found</h1>


            <p>We are sorry, but we can't find the page you are looking for.<br/>It may have been moved, or deleted.</p>


        </div>
);
}

export default NotFound;
