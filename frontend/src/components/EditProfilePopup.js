import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup (props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('Жак Ив');
    const [description, setDescription] = useState('Рыбак');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser,props.isOpen]); 
    
    function handleNameChange(e) {
        setName(e.target.value);
      }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
      }    
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();     
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
    }   

    return (
        <PopupWithForm
            title="Редактировать профиль" 
            name="edit" 
            buttonCaption = "Сохранить" 
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
            >
                <input
                    className="popup__field"
                    type="text"
                    name="title" 
                    placeholder="Имя" 
                    id="title" 
                    required 
                    minLength="2" 
                    maxLength="40" 
                    value={name || ''}
                    onChange={handleNameChange}
                 />
                <span 
                    className="popup__error" 
                    id="title-error">
                </span>
                <input 
                    className="popup__field" 
                    type="text" 
                    name="subtitle" 
                    placeholder="Профессия" 
                    id="subtitle" 
                    required 
                    minLength="2"
                    maxLength="200" 
                    value={description || ''} 
                    onChange={handleDescriptionChange} 
                />
                <span
                    className="popup__error" 
                    id="subtitle-error">
                </span>
          </PopupWithForm>
    )
}

export default EditProfilePopup;