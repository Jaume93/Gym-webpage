import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {

    return (
        <div>
            <h1>Master Gym</h1>
            <h2>Sign Up</h2>
            <div>
                Name: <input type="text" required minLength="2" placeholder="Name"></input>
            </div>
            <div>
                Last Name <input type="text" required minLength="2" placeholder="Last Name"></input>
            </div>
            <div>
                Email: <input type="email" required minLength="4" placeholder="Email@email.com"></input>
            </div>
            <div>
                Password: <input type="password" required minLength="6" placeholder="password"></input>
            </div>
            <Link to={`/LogIn`}>
                <input type="submit" value="Sign Up"></input>
            </Link>


        </div>
    );
};

export default SignUp;