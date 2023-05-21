import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {

    const inputRef = React.useRef();
    React.useEffect(() => {
        inputRef.current.value = "";
      }, [props.isOpen])
    
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: inputRef.current.value,
        });
      } 

    return (
        <PopupWithForm
        title="Обновить аватар" 
        name="avatar-form" 
        isOpen = {props.isOpen}
        onClose = {props.onClose} 
        buttonCaption = "Сохранить" 
        onSubmit = {handleSubmit}
        >
            <input 
                className="popup__field" 
                type="url" 
                name="avlink" 
                required 
                placeholder="Ссылка на картинку"
                ref={inputRef}
            />
            <span 
                className="popup__error" 
                id="avlink-error">
            </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;