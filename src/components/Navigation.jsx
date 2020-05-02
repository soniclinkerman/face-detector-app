import React from "react";
import "./css/Navigation.css"

const Navigation = ({onRouteChange, isSignedIn}) => {
    
        if(isSignedIn) {
            return(
            <nav className="sign-out">
            <p><a onClick={()=> onRouteChange("signout")}href="#" className="sign-out-link">Sign Out</a></p>
            </nav>
            )

        } else{
            return(
            <nav className="sign-out">
                <p><a onClick={()=> onRouteChange("signin")}href="#" className="sign-out-link">Sign In</a></p>
                <p><a onClick={()=> onRouteChange("register")}href="#" className="sign-out-link">Register</a></p>
            </nav>

            );
        }
    }

export default Navigation