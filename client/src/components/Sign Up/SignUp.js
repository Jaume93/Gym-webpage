import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Sign Up/SignUp.css';

const SignUp = (props) => {

    const [user_name, setUser_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handlerClick = async (e) => {
        try {
            //Esto hace que no se refresque la pagina
            e.preventDefault();

            const response = await axios.post("http://localhost:5000/members/signup");

        } catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <div>
            <h1>Master Gym</h1>
            <h2>Sign Up</h2>
            <div className="card col-12 col-lg-4 login-card mt-4 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputName"> Name:</label>
                        <input type="text"
                            className="form-control"
                            id="user_name"
                            required minLength="2"
                            placeholder="Name"
                            value={user_name}
                            onChange={(e) => { setUser_name(e.target.value) }}
                        />

                        <label htmlFor="exampleInputLastName">Last Name:</label>
                        <input type="last_name"
                            className="form-control"
                            id=""
                            required minLength="2"
                            placeholder="Last Name"
                            value={last_name}
                            onChange={(e) => { setLast_name(e.target.value) }}
                        />

                        <label htmlFor="exampleInputEmail">Email:</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            required minLength="4"
                            placeholder="Email@email.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <label htmlFor="exampleInputPassword">Password:</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            required minLength="6"
                            placeholder="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        <Link to={`/LogIn`}>
                            <input
                                type="submit"
                                value="Sign Up"
                                className="btn btn-warning"
                                onClick={handlerClick}
                            />
                        </Link>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default SignUp;