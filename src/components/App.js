import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/Api'

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false)
  const [currentUser, setcurrentUser] = React.useState({})
  const [cards, getCards] = React.useState([])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        const items = data.map((el) => ({
          _id: el._id,
          name: el.name,
          link: el.link,
          likes: el.likes,
          owner: el.owner
        }))

        getCards(items);
      })
      .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setcurrentUser(data)
      })
      .catch(err => console.log(err))
  }, [])

  function handleCardClick(card) {
    setCardPopupOpen(true)
    setSelectedCard(card)
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

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        getCards(cards.filter(card => card._id !== id))
      })
      .catch(err => console.log(err))
  }

  function handleCardDislike(id) {
    api.removeLike(id)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === id ? newCard : c);
        getCards(newCards);
      })
      .catch(err => console.log(err))
  }

  function handleCardLike(id) {
    api.putLike(id)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === id ? newCard : c);
        getCards(newCards);
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(newData) {
    api.patchUserInfo(newData)
      .then((data) => {
        setcurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(newAvatar) {
    api.patchAvatar(newAvatar)
      .then((data) => {
        setcurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard)
      .then((data) => {
        getCards([...cards, data]); 
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className="page__content">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onCardDislike={handleCardDislike}
            cards={cards}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isCardPopupOpen}
            onClose={closeAllPopups}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
