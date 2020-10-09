import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm'

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false)

  function handleCardClick(card) {
    setCardPopupOpen(true)
    setSelectedCard(card)
    console.log(selectedCard);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditProfilePopupOpen(false)
    setCardPopupOpen(false)
  }

  return (
    <div className='page'>
      <div className="page__content">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <ImagePopup card={selectedCard} isOpen={isCardPopupOpen} onClose={closeAllPopups} />
        <PopupWithForm title='Редактировать профиль' name='edit' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input id='name-input' type="text" className="pop-up__input pop-up__text" name="name" required
            minLength="2" maxLength="40" autoComplete="off" />
          <span id="name-input-error" className=""></span>
          <input id='profession-input' type="text" className="pop-up__input pop-up__text " name="about"
            required minLength="2" maxLength="200" autoComplete="off" />
          <span id="profession-input-error" className=""></span>
        </PopupWithForm>
        <PopupWithForm title='Новое место' name='new-card' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id='place' type="text" className="pop-up__text pop-up__text_type_place" placeholder="Название"
            name="name" required minLength="1" maxLength="30" />
          <span id="place-error" className=""></span>
          <input id='url' type="url" className="pop-up__text pop-up__text_type_link" placeholder="Ссылка на картинку"
            name='link' required />
          <span id="url-error" className=""></span>
        </PopupWithForm>
        <PopupWithForm title='Вы уверены?' name='delete-card'>
        </PopupWithForm>
        <PopupWithForm title='Обновить аватар' name='edit-avatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input id='place' type="url" className="pop-up__text pop-up__text_type_place" placeholder="ссылка"
            name="avatar" required />
          <span id="place-error" className=""></span>
        </PopupWithForm>
        <Footer />
      </div>
    </div>
  );
}

export default App;
