import React, { useState,useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js'
import api from "../utils/Api.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import { singIn, singUp, checkToken } from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip.js';

function App() {

  const [isEditProfilePopupOpen,setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen,setDeleteCardPopupOpen] = useState(false);
  const [selectedCard,setSelectedCard] = useState(null);
  const [currentUser,setCurrentUser] = useState({});
  const [cards,setCards] = useState([]);
  const [cardToDelete,setCardToDelete] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [isInfoToolTipPopupOpen,setInfoToolTipPopupOpen] = useState(false);
  const [isRegistered,setRegistered] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    checkToken(token)
      .then((data) => {
          console.log(data);
          setLoggedIn(true);
          navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (loggedIn) {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData,initalСards]) => {
        setCurrentUser(userData);
        setCards(initalСards);
      })
      .catch(err => console.error(err));
    }
  }, [loggedIn]);

  const navigate = useNavigate();
  function handleEditProfileClick () {
    setProfilePopupOpen(true);
  }
  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }
  function handleCardDelete() {
    api.delCard(cardToDelete._id)
      .then((deletedCard) => {
       setCards(cards.filter(item => item._id !== cardToDelete._id))
      })
      .catch(err => console.error(err));
      closeAllPopups();
  }
  function handleConfirmCardDelete (card) {
    setDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);    
    console.log(currentUser);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => console.error(err));
  } 
  function handleUpdateUser(data) {
    api.editProfile(data).then(
      (userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      }
    ).catch(err => console.error(err));
  }
  function handleUpdateAvatar(link) {
    api.updateAvatar(link).then(
        (userData) => {
        setCurrentUser(userData);
        closeAllPopups();
        }      
    ).catch(err => console.error(err));
  }
  function handleAddPlaceSubmit (data) {
    api.addCard(data)
      .then ((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }
  function closeAllPopups () {
    setProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setInfoToolTipPopupOpen(false);
    setInfoMessage('');
  }
  function handleSignUp({password,email}) {
    singUp(password,email)
      .then ((data) => {
        setInfoMessage('Вы успешно зарегистировались!');
        setRegistered(true);
        setInfoToolTipPopupOpen(true);
        navigate ('/sign-in', { replace: true });
      })
    .catch((err) => {
      setInfoMessage(`Что-то пошло не так!${err}`);
      setRegistered(false);
      setInfoToolTipPopupOpen(true);
      console.log(err);
    })
  }
  function handleSignIn ({password,email}) {  
    singIn(password,email)
      .then ((data)=> {
        localStorage.setItem("token", data.token);
        setCurrentEmail(email);
      })
      .then (()=> {
        setInfoMessage('Опять ты? Добро пожаловать!');
        setRegistered(true);
        setInfoToolTipPopupOpen(true);
        navigate ('/', { replace: true });
        setLoggedIn(true);
      })
    .catch((err) => {
      setInfoMessage(err);
      setRegistered(false);
      setInfoToolTipPopupOpen(true);
      console.log(err);
    })
  }
  function signOut () {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header isLoggedIn={loggedIn} onSignOut={signOut} email={currentEmail} />
          <Routes>
            <Route path="/sign-in" element={<Login onSubmit={handleSignIn} />} />
            <Route path="/sign-up" element={<Register onSubmit={handleSignUp} />} />
            <Route path="/" element={
              <ProtectedRoute isLoggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmCardDelete}
                  cards={cards} />
              </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ConfirmPopup isOpen = {isDeleteCardPopupOpen} onClose = {closeAllPopups} onSubmit={handleCardDelete} /> 
          <ImagePopup card = {selectedCard} onClose = {closeAllPopups} > </ImagePopup>
          <InfoTooltip isOpen={isInfoToolTipPopupOpen} onClose={closeAllPopups} isRegistered={isRegistered} infoMessage={infoMessage}></InfoTooltip>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
