import { Link, useHistory } from "react-router-dom";
import React from "react";
import '../Navbar/Navbar.css';

const NavBar = ({ user }) => {

    const history = useHistory();

    const LogOut = async () => {
        try {
            localStorage.clear()
            history.push(`/LogIn`);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <nav className="py-3 navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Master Gym</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="mt-3 underline">
                            <Link className="home_page" to="/"> Home Page </Link>
                        </li>
                        <li className="mt-3 underline">
                            <Link to="/Activities"> Activities</Link>
                        </li>
                        <li className="mt-3 underline">
                            <Link to="/MembershipFees">Membership Fees</Link>
                        </li>
                        <li className="mt-3 underline">
                            <Link to="/Services">Services</Link>
                        </li>

                        {/* enseña el perfil del miembro si esta Log in y esconde Log in / Sign in*/}
                        {user ?
                            <div>
                                <li className="my-3 underline">
                                    <Link to="/member/yourInfo">Your Information</Link>
                                </li>
                                <li
                                    className="mt-3"
                                    onClick={LogOut}>
                                    <button className=" btn btn-outline-secondary">
                                        Log Out
                                    </button>
                                </li>
                            </div> :
                            <div>
                                <li className="mt-3">
                                    <button className=" btn btn-outline-secondary">
                                        <Link to="/LogIn">Log In</Link>
                                    </button>
                                </li>
                                <li className="my-3">
                                    <button className=" btn btn-outline-secondary">
                                        <Link to="/SignUp">Sign Up</Link>
                                    </button>
                                </li>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </nav >);
};
export default NavBar;

