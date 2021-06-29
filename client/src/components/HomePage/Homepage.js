import React from 'react';
import '../HomePage/Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div>
            <img src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/03/11/15523046827096.jpg" class="d-block w-100" alt="..."></img>
            <h1> Master Gym</h1>
            <p>descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion </p>
            <Link to={`/SignUp`}>
                <input type="submit" value="Subscribe"></input>
            </Link>

        </div>
    );
};

export default Homepage;