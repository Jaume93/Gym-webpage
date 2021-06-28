import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import '../Services/Services.css';

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const getServices = async () => {
            const response = await axios("http://localhost:5000/services/");
            console.log(response)
            setServices(response.data.services);
        }
        getServices();
    }, [])

    return (
        <div>
            <h2>Services</h2>
            <ul>
                {services.map(service => {
                    return (
                        <Link key={service._id} to={`/services/find/${service._id}`}>
                            <li> {service.serviceName}</li>
                        </Link>
                    )
                })}
            </ul>
        </div >
    );
};

export default Services;