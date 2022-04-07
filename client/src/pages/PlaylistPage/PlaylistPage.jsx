import { useEffect } from 'react';
import './PlaylistPage.css';
import { Spotify } from '../../core/Spotify';
import PlaylistTile from './components/PlaylistTile';
import PlaylistDrawer from './components/PlaylistDrawer';
import { setToken } from '../../store/tokenReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPlaylists } from '../../store/playlistsReducer';
import spotifyRequests from '../../spotifyRequests';
import Header from '../../components/Header';
import Social from '../../components/Social';

const code = new URLSearchParams(window.location.search).get('code');

export const PlaylistPage = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.token.access_token);
    const userPlaylists = useSelector(state => state.userPlaylists.playlist);

    useEffect(() => {
        spotifyRequests(code).then(res => {
            dispatch(setToken(res));
        })
    }, []);

    const onClickHandler = () => {
        const spotify = new Spotify();

        const response = spotify.getCurrentUserPlaylistList({
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
    };

    return (
        <div className='container'>
            <Social />
            <Header />
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
                        <button className='start' style={{ 'margin': 20 }} onClick={onClickHandler} >Загрузить информацию</button>
                    </div>
                </div>
                <div className="service-container_mainContent-list">
                    {userPlaylists.map((playlist) =>
                        <PlaylistTile playlist={playlist} />
                    )}
                </div>
            </div>
        </div>
    )

}

export default PlaylistPage;