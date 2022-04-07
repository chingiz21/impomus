import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { Spotify } from "../../../../core/Spotify";
import { getPlaylist, setVisibleAction } from "../../../../store/drawerReducer";

const PlaylistTile = ({ playlist, onClick }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.token.access_token);
  console.log(accessToken);

  const onClickHandler = (playlistId) => {
    const spotifyApi = new Spotify();
    const response = spotifyApi.getPlaylist(playlistId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            token: accessToken
    });

    response.then(playlist => {
      dispatch(getPlaylist(playlist));
    })
    setTimeout(() => {
      dispatch(setVisibleAction(true));
    }, 300);
  };

  return (
    <div className="service-container_mainContent-list_item">
        <img src={playlist.images[0].url} className="service-container_mainContent-list_item-img"></img>
        <div className="service-container_mainContent-list_item-text">
            <div className="service-container_mainContent-list_item-text_title"><a href={playlist.external_urls.spotify} target="_blank" >{playlist.name}</a></div>
            <button className="service-container_mainContent-list_item-text_button" onClick={() => onClickHandler(playlist.id)} >Выбрать</button>
        </div>
    </div>
  )
}

export default React.memo(PlaylistTile)