import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import './Social.css';

const Social = () => {
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
            
        </div>
    )
}

export default Social;