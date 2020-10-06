import React from 'react';
import logoPath from '../images/logo.svg';

function Header() {
	return (
		<header className="header">
			<a href='#'><img className="header__logo" src={logoPath} alt='изображение логотипа' /></a>
		</header>
	);
}

export default Header;