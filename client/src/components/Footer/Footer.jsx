import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <footer className="footer">
                <a href="#" className="footer-link-inst">
                    <Instagram sx={{ "&:hover": { fill: "#5AE5E3" } }} />
                </a>
                <a href="#" className="footer-link-twitter">
                    <Twitter sx={{ "&:hover": { fill: "#5AE5E3" } }} />
                </a>
                <a href="#" className="footer-link-facebook">
                    <Facebook sx={{ "&:hover": { fill: "#5AE5E3" } }} />
                </a>
            </footer>
            <Link to='/' className="nav-links">MainPage</Link>
            <Link to='/services' className="nav-links">ServicePage</Link>
            <Link to='/playlists' className="nav-links">PlaylistPage</Link>
            <Link to='/success' className="nav-links">Success</Link>
        </div>
    )
}

export default Footer;