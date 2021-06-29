import { Link } from "react-router-dom";
import React from "react";
import '../Navbar/Navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Master Gym</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li>
                            <Link to="/"> Home Page </Link>
                        </li>
                        <li>
                            <Link to="/Activities"> Activities</Link>
                        </li>
                        <li>
                            <Link to="/MembershipFees">Membership Fees</Link>
                        </li>
                        <li>
                            <Link to="/Services">Services</Link>
                        </li>
                        <li>
                            <Link to="/LogIn">Log In</Link>
                        </li>
                        <li>
                            <Link to="/SignUp">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>);
};
export default NavBar;

