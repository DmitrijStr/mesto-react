import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup'

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState('#');
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
          closeAllPopups={closeAllPopups}
          onCardClick={handleCardClick}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        />
        <ImagePopup card={selectedCard} isOpen={isCardPopupOpen} onClose={closeAllPopups} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
