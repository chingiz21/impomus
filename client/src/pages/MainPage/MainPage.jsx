import './MainPage.css';
import { useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import Social from '../../components/Social';

export const MainPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="container">
      <Social />
      <Header />
      <div className="content-container">
        <div className="content-container-img"></div>
        <div className="content-container-text">
          <h1 className="title">С платформы на платформу</h1>
          <h2 className="descr-mainPage">Перенесите ваш плейлист с одной платформы на другую моментально</h2>
          <Link to={'/services'}><button className="start">Начать</button></Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage;