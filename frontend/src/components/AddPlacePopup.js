import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {

    const [values, setValues] = React.useState({});
    React.useEffect(() => {
        setValues({name:'',link:''});
      }, [props.isOpen]); 

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(values);
    } 
    
    return (
        <PopupWithForm
            title="Новое место" 
            name="enewItem" 
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            buttonCaption = "Создать" 
            onSubmit = {handleSubmit}
            >
                <input className="popup__field" type="text" name="name" required placeholder="Название" minLength="2" maxLength="30" onChange={handleInputChange} value={values.name || ''}/>
                <span className="popup__error" id="name-error"></span>
                <input className="popup__field" type="url" name="link" required placeholder="Ссылка на картинку" onChange={handleInputChange} value={values.link || ''} />
                <span className="popup__error" id="link-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup;