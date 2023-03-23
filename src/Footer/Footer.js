import '../styles/index.scss'
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className='footer'>
                    <p>TCGFind 2023 © <Link to="/About"> About</Link></p>
            </div>
        </>
    );
}