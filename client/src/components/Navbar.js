import { Link } from "react-router-dom";
import React from "react";

const NavBar = () => {
    return (
        <nav>
            <ul>
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
                    <Link to="/Homepage">Log In</Link>
                </li>
                <li>
                    <Link to="/Homepage">Sign Up</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;