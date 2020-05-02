import React from "react";
import '../App.css';
import "./css/ImageLinkForm.css"

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div className="">
            <p className="heading">
                This magic brain will detect faces
            </p>

            <input type="text" className="text-field" onChange={onInputChange}/>
        
        
            <button className="btn" onClick={onSubmit}>Detect</button>

        </div>
    )
}

export default ImageLinkForm