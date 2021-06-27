import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Service = () => {
    const { serviceId } = useParams();

    const [service, setService] = useState({});

    useEffect(() => {
        const getService = async () => {
            const response = await axios(`http://localhost:5000/activities/find/${serviceId}`);
            setService(response.data.service)
        };
        getService();
    });

    return (
        <div>
            <p> {service._id}</p>
            <p> {service.serviceName}</p>
            <p>Description: {service.description}</p>
            <p>Fee: {service.membFee}</p>
        </div>
    );
};

export default Service;