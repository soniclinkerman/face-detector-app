import React from "react";
import "./css/FaceRecoginition.css"

const FaceRecognition = ({imageURL, box}) => {
    return(
        <div className= "ma center">
            <div className="absolute mt2 tc">
            <img id="inputimage" className="center" src={imageURL} alt="" width="500px" height="auto"/>
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )

}

export default FaceRecognition