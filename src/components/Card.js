import React from 'react'

function Card(props) {

	const { card, src, title, likes } = props;

	function handleClick() {
		props.onCardClick(card);
	}

	return (
		<div className="photo-grid__item">
			<button className="photo-grid__trash-button hover-button" type="button">
			</button>

			<div style={{ backgroundImage: `url(${src})` }} className="photo-grid__image photo-grid__image-button hover-button" type='button' onClick={handleClick}></div>

			<div className="photo-grid__description">
				<h2 className="photo-grid__place">{title}</h2>
				<div className="photo-grid__like-wrapper">
					<button className="photo-grid__like-button hover-button" type="button"></button>
					<p className="photo-grid__likes-count">{likes}</p>
				</div>
			</div>
		</div>
	)
}

export default Card;