import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card (props) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  console.log(isLiked);
  const cardLikeButtonClassName = ( 
    `elements__like-button ${isLiked && 'elements__like-button_on'}` 
  );

  function handleClick() {
    props.onCardClick(props.card);
    } 
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  function handleDelClick() {
    props.onCardDelete(props.card);
  }
  
    return (
        <li className="elements__element">
        <img onClick={handleClick} className="elements__image" src={props.card.link} alt={props.card.name} />
        {isOwn && <button className='elements__trash-button' onClick={handleDelClick} />} 

        <div className="elements__caption">
          <h2 className="elements__text">{props.card.name}</h2>
          <div className="elements__like-container">
            <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
            <span className="elements__like-count">{props.card.likes.length}</span>  
          </div>
        </div>
      </li>
    )
}

export default Card;