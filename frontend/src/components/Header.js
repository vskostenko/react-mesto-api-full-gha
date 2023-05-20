import React from 'react';
import logo from '../images/Vector.svg';
import { Link, useLocation, Route, Routes } from 'react-router-dom';

function Header(props) {
    const location = useLocation();
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="место"/>
            <div className='header__profile'>
            <p className='header__email'>{props.isLoggedIn && props.email}</p>
            <Routes>
                <Route path='/sign-up' element={<Link to="/sign-in" className="header__link">Войти</Link> } />
                <Route path='/sign-in' element={<Link to="/sign-up" className="header__link">Регистрация</Link>  } />
                <Route path='/' element={<Link to="/sign-in" className="header__link" onClick={props.onSignOut}>Выйти</Link>  } />
            </Routes>
            </div>
        </header>
    )
}

export default Header;