import React from 'react';
import { Link } from 'react-router-dom';
import '../Log In/LogIn.css';

const LogIn = () => {

    return (
        <div>
            <h1>Master Gym</h1>
            <h2>Private Area</h2>
            <input type="email" required minLength="4" placeholder="Email@email.com"></input>
            <input type="password" required minLength="6" placeholder="password"></input>
            <div>
                <input type="submit" value="Log In"></input>
            </div>
            <h2>Still not a Member?</h2>
            <p>Welcome to Master Gym. An experience with all kinds of services to take care of your well-being: medical fitness, nutrition advice and personal training service. In addition, you can enjoy a wide variety of directed activities as well as a room dedicated solely to taking care of your body and soul. </p>
            <Link to={`/SignUp`}>
                <input type="submit" value="Sign Up"></input>
            </Link>
        </div>
    );
};

export default LogIn;