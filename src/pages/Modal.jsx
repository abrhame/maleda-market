import React from "react";
import FoodDetails from "./FoodDetails";

const Modal = (props) => {
    return(
        <div id="modal">
            <FoodDetails props = {props} />
        </div>
    )
}

export default Modal;