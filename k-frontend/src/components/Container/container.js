import React, {useLayoutEffect} from "react";
import "./container.css";
import {MobileNav} from "../NavBar/MobileNav";
import {useLocation} from "react-router-dom";

const Container = (props) => {
    const location = useLocation();

/*    // Scroll to top when location changes
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);*/


    return (
      <main className="container">
          <div className="container-children">
              {props.children}
          </div>
        <MobileNav />
      </main>
    );
};

export default Container;
