import React from 'react';
import plusButtonPath from '../images/plus.svg';
import PopupWithForm from './PopupWithForm'
import api from '../utils/Api'
import Card from './Card'

function Main(props) {

  const [userName, setUserName] = React.useState('#')
  const [userDescription, setUserDescription] = React.useState('#')
  const [userAvatar, setUserAvatar] = React.useState()
  const [cards, getCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo().then((data) => {
      setUserName(data.name)
      setUserDescription(data.about)
      setUserAvatar(data.avatar)
    })
  }, [])

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      console.log(data)
      const items = data.map((el) => ({
        id: el._id,
        title: el.name,
        src: el.link,
        likes: el.likes.length
      }))
      console.log(items)

      getCards(items);
    });
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__infos">
          <figure className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
            <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar" src="#" alt="изображение аватара">
            </div>
          </figure>
          <div className="profile__description">
            <div className='profile__info'>
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__button profile__button_action_edit hover-button" type="button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__profession">{userDescription}</p>
          </div>
        </div>
        <button className="profile__button profile__button_action_add hover-button" type="button" onClick={props.onAddPlace}>
          <img src={plusButtonPath} alt='изображение кнопки добавить' />
        </button>
      </section>
      <section className="photo-grid">
        {cards.map(({ id, ...card }) => (
          <Card key={id} {...card} onCardClick={props.onCardClick} card={card}/>
        ))}
      </section>
      <PopupWithForm title='Редактировать профиль' name='edit' isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups}>
        <input id='name-input' type="text" className="pop-up__input pop-up__text" name="name" required
          minLength="2" maxLength="40" autoComplete="off" />
        <span id="name-input-error" className=""></span>
        <input id='profession-input' type="text" className="pop-up__input pop-up__text " name="about"
          required minLength="2" maxLength="200" autoComplete="off" />
        <span id="profession-input-error" className=""></span>
      </PopupWithForm>
      <PopupWithForm title='Новое место' name='new-card' isOpen={props.isAddPlacePopupOpen} onClose={props.closeAllPopups}>
        <input id='place' type="text" className="pop-up__text pop-up__text_type_place" placeholder="Название"
          name="name" required minLength="1" maxLength="30" />
        <span id="place-error" className=""></span>
        <input id='url' type="url" className="pop-up__text pop-up__text_type_link" placeholder="Ссылка на картинку"
          name='link' required />
        <span id="url-error" className=""></span>
      </PopupWithForm>
      <PopupWithForm title='Вы уверены?' name='delete-card'>
      </PopupWithForm>

      <PopupWithForm title='Обновить аватар' name='edit-avatar' isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups}>
        <input id='place' type="url" className="pop-up__text pop-up__text_type_place" placeholder="ссылка"
          name="avatar" required />
        <span id="place-error" className=""></span>
      </PopupWithForm>
    </main>
  );
}

export default Main;