import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
    return (
        <div className='wrapper__header'>
            <Link to='/' className="nav-links">Главная</Link>
            <Link to='/services' className="nav-links">Выбор сервисов</Link>
            <Link to='/playlists' className="nav-links">Список плейлистов</Link>
        </div>
    )
}

export default Header;