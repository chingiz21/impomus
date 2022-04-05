import './PlaylistDrawer.css';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibleAction } from '../../../../store/drawerReducer';
import TrackRow from './components/TrackRow';
import axios from 'axios';

const PlaylistDrawer = () => {
  const dispatch = useDispatch();
  const visibleState = useSelector(state => state.buttonVisibility.visibility);
  const playlist = useSelector(state => state.buttonVisibility.playlist);
  const importType = useSelector(state => state.importType.type);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch(setVisibleAction(false));
  }

  const onYoutubeClick = () => {
    axios
      .post('http://localhost:5000/youtube/login', playlist)
      .then(response => {
        window.location.assign(response.data.authorizationUrl);
      })
      .catch(e => console.error(e));
  };


  if (visibleState === false) {
    return <div></div>
  }

  else {
    return (
      <div>
        <Drawer
          anchor='left'
          open={visibleState}
          // onClose={dispatch(setVisibleAction(false))}
          onClose={toggleDrawer('left', false)}
          PaperProps={{ sx: { width: 500, backgroundColor: '#202186' } }}
        >
          <div className='drawer__content-wrapper'>
            <a className='drawer__content-title' href={playlist.external_urls.spotify} target="_blank" ><h1>{playlist.name}</h1></a>
            <img src={playlist.images[0].url} className='drawer__content-img' />
            <div className='drawer__content-descr_wrapper'>
              <h3 className='drawer__content-descr_title'>Описание</h3>
              <p className='drawer__content-descr_text'>{playlist.description}</p>
            </div>
            <div className='drawer__content-table_wrapper'>
              <table className='drawer__content-table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Исполнитель</th>
                    <th>Длительность</th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.tracks.items.map((item, index) =>
                    <TrackRow track={item} index={index} />
                  )}
                </tbody>
              </table>
            </div>
            <div className="drawer__content_import-button">
              <button className='import-button_button' onClick={onYoutubeClick} >Перенести</button>
            </div>

          </div>
        </Drawer>
      </div>
    )
  }
}

export default PlaylistDrawer;