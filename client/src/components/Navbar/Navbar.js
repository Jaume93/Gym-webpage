import { Link } from "react-router-dom";
import React from "react";
import '../Navbar/Navbar.css';

const NavBar = ({ user }) => {

    return (
        <nav className="py-3 navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Master Gym</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="mt-3">
                            <Link to="/"> Home Page </Link>
                        </li>
                        <li className="mt-3">
                            <Link to="/Activities"> Activities</Link>
                        </li>
                        <li className="mt-3">
                            <Link to="/MembershipFees">Membership Fees</Link>
                        </li>
                        <li className="mt-3">
                            <Link to="/Services">Services</Link>
                        </li>

                        {/* enseña el perfil del miembro si esta Log in y esconde Log in / Sign in*/}
                        {user ?
                            <li className="my-3">
                                <Link to="/member/yourInfo">Your Information</Link>
                            </li> :
                            <div>
                                <li className="mt-3">
                                    <Link to="/LogIn">Log In</Link>
                                </li>
                                <li className="my-3">
                                    <Link to="/SignUp">Sign Up</Link>
                                </li>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </nav >);
};
export default NavBar;

