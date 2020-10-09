import React from 'react';

function PopupWithForm(props) {

	const { name, isOpen, onClose, title, children } = props;
	
	return (
		<section className={`pop-up popup_type_${name} ${isOpen && 'pop-up_type_opened'}`} >
			<div className="pop-up__container">
				<button className="pop-up__btn pop-up__btn_action_deny hover-button" type="button" onClick={onClose}>
				</button>
				<p className="pop-up__title">{title}</p>
				<form className="pop-up__input pop-up__form" method="GET" noValidate>
					{children}
					<button className="pop-up__btn pop-up__btn_action_save pop-up__btn_type_inactive" type="submit" disabled>
						Сохранить
				</button>
				</form>
			</div>
		</section>
	)
}

export default PopupWithForm;