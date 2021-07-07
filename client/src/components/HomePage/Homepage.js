import React from 'react';
import '../HomePage/Homepage.css';
import { Link } from 'react-router-dom';
import ActivitySchedule from '../Activities/ActivitySchedule';

const Homepage = () => {
    return (
        <div className="mb-5">
            <img src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/03/11/15523046827096.jpg" className="d-block w-100" alt="..."></img>
            <h1 className="mt-4"> Master Gym</h1>
            <div className="mt-3 container">Welcome to Master Gym, the most exclusive Gym in Barcelona. An experience with all kinds of services to take care of your well-being: medical fitness and nutrition advice. In addition, you can enjoy a wide variety of directed activities as well as a room dedicated solely to taking care of your body and soul.</div>

            <Link to={`/SignUp`}>
                <input className="mb-5 mt-2 btn btn-success" type="submit" value="Subscribe"></input>
            </Link>
            <ActivitySchedule />
        </div>
    );
};

export default Homepage;