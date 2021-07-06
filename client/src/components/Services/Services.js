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
        <div className="my-5">
            <h2 className="mt-5">Services</h2>

            {services.map(service => {
                return (
                    <Link key={service._id} to={`/services/find/${service._id}`}>
                        <div className="my-3"> {service.serviceName}</div>
                    </Link>
                )
            })}
        </div >
    );
};

export default Services;