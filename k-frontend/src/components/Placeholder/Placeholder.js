import React from 'react';
import {useLocation} from "react-router-dom";
import '../NotFound/Notfound.css'

function Placeholder(props) {

    const pathname = useLocation().pathname


    return (
        <div className='not-found'>

            <h1>{pathname.substring(1)}</h1>

        </div>
    );
}

export default Placeholder;