import React from 'react';
import plusButtonPath from '../images/plus.svg';
import api from '../utils/Api'
import Card from './Card'

function Main(props) {

  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;
  const [userName, setUserName] = React.useState('#')
  const [userDescription, setUserDescription] = React.useState('#')
  const [userAvatar, setUserAvatar] = React.useState()
  const [cards, getCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
      })
      .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        const items = data.map((el) => ({
          id: el._id,
          title: el.name,
          src: el.link,
          likes: el.likes.length
        }))

        getCards(items);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__infos">
          <figure className="profile__avatar-wrapper" onClick={onEditAvatar}>
            <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar" src="#" alt="изображение аватара">
            </div>
          </figure>
          <div className="profile__description">
            <div className='profile__info'>
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__button profile__button_action_edit hover-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__profession">{userDescription}</p>
          </div>
        </div>
        <button className="profile__button profile__button_action_add hover-button" type="button" onClick={onAddPlace}>
          <img src={plusButtonPath} alt='изображение кнопки добавить' />
        </button>
      </section>
      <section className="photo-grid">
        {cards.map(({ id, ...card }) => (
          <Card key={id} {...card} onCardClick={onCardClick} card={card} />
        ))}
      </section>
    </main>
  );
}

export default Main;