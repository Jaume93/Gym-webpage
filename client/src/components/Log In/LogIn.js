import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../Log In/LogIn.css';

const LogIn = ({ getUser }) => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerClick = async (e) => {
        //Esto hace que no se refresque la pagina
        e.preventDefault();
        try {
            const body = {
                email,
                password,
            }
            const response = await axios.post("/members/login", body);
            console.log(response)
            localStorage.setItem("token", response.data.token)

            getUser();

            //si los datos coinciden con los que se ha inscrito el usuario, en 2seg se Logea y va a la pag HomePage
            setTimeout(() => {
                history.push("/");
            }, 1000);

        } catch (err) {
            console.log(err.response.data)
        }
    }
    return (
        <div>
            <h1>Master Gym</h1>
            <h2>Private Area</h2>
            <div className="card col-12 col-lg-4 login-card mt-4 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail">Email</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            required minLength="4"
                            placeholder="Email@email.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            required minLength="6"
                            placeholder="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <input
                            type="submit"
                            value="Log In"
                            className="my-3 btn btn-dark"
                            onClick={handlerClick}
                        />

                        <h2>Still not a Member?</h2>
                        <p>Welcome to Master Gym. An experience with all kinds of services to take care of your well-being: medical fitness, nutrition advice and personal training service. In addition, you can enjoy a wide variety of directed activities as well as a room dedicated solely to taking care of your body and soul. </p>
                        <Link to={`/SignUp`}>
                            <input className="mb-4 btn btn-secondary" type="submit" value="Sign Up"></input>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogIn;