import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup (props) {

    function handleSubmit(e) {
        e.preventDefault();  
        props.onSubmit();
      }  

    return (
        <PopupWithForm
            title="Вы уверены?" 
            name="delete" 
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            buttonCaption = "Да"
            onSubmit = {handleSubmit}
            >
          </PopupWithForm>
    )
}

export default ConfirmPopup;