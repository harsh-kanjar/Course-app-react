import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer p-4" data-bs-theme="dark">
            <div className="container text-center">
                <p>&copy; 2024 CaurseApp. All rights reserved.</p>
                <p className="mt-4 mb-4">Signup for free - <Link to="/signup"><button className="btn btn-primary mx-2">Signup</button></Link></p>
                <hr />
            </div>
        </footer>
    );
};

export default Footer;
