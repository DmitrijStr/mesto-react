import React from 'react'

function Card(props) {

	function handleClick() {
		props.onCardClick(props.card);
	}  

	return (
		<div className="photo-grid__item">
			<button className="photo-grid__trash-button hover-button" type="button">
			</button>

			<div style={{ backgroundImage: `url(${props.src})`}} className="photo-grid__image photo-grid__image-button hover-button" type='button' onClick={handleClick}></div>

				<div className="photo-grid__description">
					<h2 className="photo-grid__place">{props.title}</h2>
					<div className="photo-grid__like-wrapper">
						<button className="photo-grid__like-button hover-button" type="button"></button>
						<p className="photo-grid__likes-count">{props.likes}</p>
					</div>
				</div>
		</div>
		)
}

export default Card;