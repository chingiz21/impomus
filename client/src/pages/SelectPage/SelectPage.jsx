import Header from '../../components/Header';
import './SelectPage.css';
import Social from '../../components/Social';

export const SelectPage = () => {
  return (
    <div className="service-container-selectPage">
        <div className="service-container_imgLeft"></div>
        <div className="service-container_mainContent">
        <Social />
        <Header />
            <div className="service-container_mainContent-title">
                <h1 className="title">С платформы на платформу</h1>
                <div className="service-container_mainContent-title_list">
                    <div className="service-container_mainContent-title_list-item active">1</div>
                    <div className="service-container_mainContent-title_list-item">2</div>
                    <div className="service-container_mainContent-title_list-item">3</div>
                </div>
                <h2 className="service-container_mainContent-descr">Выберите первоначальную платформу </h2>
            </div>
            <div className="service-container_mainContent-list-selectPage">
                <a href="http://localhost:5000/spotify/login"><div className='img'></div><span className='subtitle'>Spotify</span></a>
                <a href='http://localhost:5000/file/import'><div className='img' id='fileSystem'></div><span className='subtitle'>File System</span></a>
            </div>
        </div>
        <div className="service-container_imgRight"></div>
    </div>
  )
}

export default SelectPage;