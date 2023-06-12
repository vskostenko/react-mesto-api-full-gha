import React from "react";
import yes from '../images/accept.svg';
import no from '../images/fail.svg';

function InfoTooltip(props) {
    return (
        <section className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <div className="popup__infocontainer">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <img className="popup__icon" src={props.isRegistered ? yes : no} alt="yes or no" />
                <h2 className="popup__caption">{props.infoMessage}</h2>
                </div>
            </div>
      </section>
    )
}

export default InfoTooltip;
