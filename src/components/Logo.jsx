import React from "react";
import Tilt from 'react-tilt';
import "./css/Logo.css";
const Logo = () => {
    return(
        <div className="logo">
            <Tilt className="Tilt" options={{ max : 65 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> 
          
                <i className="fas fa-brain"></i>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;