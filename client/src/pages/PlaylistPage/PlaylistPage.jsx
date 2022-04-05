import { Fragment, useEffect, useState } from 'react';
import './PlaylistPage.css';
import axios from 'axios';
import useAuth from '../../useAuth';
import { Spotify } from '../../ServiceFactory/Spotify';
import PlaylistTile from './components/PlaylistTile';
import PlaylistDrawer from './components/PlaylistDrawer';
import { Button } from '@mui/material';
import { setToken } from '../../store/tokenReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPlaylists } from '../../store/playlistsReducer';
import spotifyRequests from '../../spotifyRequests';

const code = new URLSearchParams(window.location.search).get('code');

export const PlaylistPage = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.token.access_token);
    const userPlaylists = useSelector(state => state.userPlaylists.playlist);

    const onButtonClick = () => {
        console.log('tile button')
    }

    useEffect(() => {
        spotifyRequests(code).then(res => {
            dispatch(setToken(res));
        })
    }, [])


    const onClickHandler = () => {
        const spotify = new Spotify();

        const response = spotify.getUserPlaylistList('xcgbzlgmt27wqkvifkun208zz', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            token: accessToken
        });

        response.then(playlistsList => {
            dispatch(setUserPlaylists(playlistsList.items));
        })
    }
    console.log(userPlaylists);

    // if (userPlaylists == undefined || null) {
    //     return (
    //         <button className='start' style={{ 'margin': 20 }} onClick={onClickHandler} >Загрузить информацию</button>
    //     )
    // }

    return (
        <Fragment>
            <PlaylistDrawer />

            <div className='service-container'>
                <div className="service-container_mainContent">
                    <div className="service-container_mainContent-title">
                        <h1 className="title">С платформы на платформу</h1>
                        <div className="service-container_mainContent-title_list">
                            <div className="unactive service-container_mainContent-title_list-item ">1</div>
                            <div className="service-container_mainContent-title_list-item active">2</div>
                            <div className="service-container_mainContent-title_list-item">3</div>
                        </div>
                        {/* <h2 className="service-container_mainContent-descr">Выберите музыку или плейлист</h2> */}
                        <button className='start' style={{ 'margin': 20 }} onClick={onClickHandler} >Загрузить информацию</button>
                    </div>
                </div>
                <div className="service-container_mainContent-list">
                    {userPlaylists.map((playlist) =>
                        <PlaylistTile playlist={playlist} onClick={onButtonClick} />
                    )}
                </div>
            </div>
        </Fragment>
    )

}

export default PlaylistPage;