import './MainPage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeToken } from '../../store/tokenReducer';

export const MainPage = () => {

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="container">
      <div className="content-container">
        <div className="content-container-img"></div>
        <div className="content-container-text">
          <h1 className="title">С платформы на платформу</h1>
          <h2 className="descr-mainPage">Перенесите ваш плейлист с одной платформы на другую моментально</h2>
          <a href="/services"><button className="start">Начать</button></a>
          {/* <form action='' method='post'>
                  <button className='start'>Начать</button>
                </form> */}
        </div>
      </div>
    </div>
  )
}

export default MainPage;