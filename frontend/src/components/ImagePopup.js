import React from "react";

function ImagePopup(props) {

    return (
        <section className={`popup popup_overlay ${props.card !== null && 'popup_opened'}`} id="image-popup">
            <div className="popup__image-container">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
                <h2 className="popup__image-caption">{props.card?.name}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;