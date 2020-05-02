import React from "react";
import "./css/Rank.css"

const Rank = ({name, entries}) => {
    return(
        <div className="">
            <p className="rank-heading">
            {`${name} , your current rank is...`}
            </p>
            <div className='white f1 '>
                {entries}
            </div>

        </div>
    )
}

export default Rank