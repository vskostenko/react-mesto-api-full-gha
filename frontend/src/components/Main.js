import React, { useState } from "react";
import Card from './Card.js'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <img className="profile__avatar" src={currentUser.avatar} alt="аватар"/>
                <button className="profile__avatar-button" onClick={props.onEditAvatar} ></button>
                <div className="profile__title-block">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{currentUser.about}</p>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((item) => 
                        <Card  
                        card={item} 
                        key={item._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        />
                    )}
                </ul>                
            </section>
      </main>
    )
}

export default Main;