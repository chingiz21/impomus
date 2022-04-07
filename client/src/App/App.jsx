import { Fragment } from 'react';
import { Success } from '../components/Success/Success';
import MainPage from '../pages/MainPage'
import PlaylistPage from '../pages/PlaylistPage';
import SelectPage from '../pages/SelectPage';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/services' element={<SelectPage />} />
            <Route path='/playlists' element={<PlaylistPage />} />
            <Route path='/success' element={<Success />} />
          </Routes>
        </BrowserRouter>
    </Fragment>
  )
}

export default App