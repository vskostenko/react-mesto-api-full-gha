import React from "react";


function PopupWithForm(props) {
    return (
        <section className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            <form onSubmit={props.onSubmit} className="popup__form" name={props.name}>
                <h2 className="popup__header">{props.title}</h2>
                {props.children}
                <input className="popup__button" type="submit" value={props.buttonCaption} />
          </form>
        </div>
      </section>
    )
}

export default PopupWithForm;