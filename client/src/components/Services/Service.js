import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Service = () => {
    const { serviceId } = useParams();

    const [service, setService] = useState({});

    useEffect(() => {
        const getService = async () => {
            const response = await axios(`http://localhost:5000/services/find/${serviceId}`);
            setService(response.data.service)
        };
        getService();
    });

    return (
        <div>
            <p> {service.serviceName}</p>
            <p>Description: {service.description}</p>
            <h3>Fees allowed</h3>
            <p>{service.membFee?.map((fee, i, array) => fee.name + (i < array.length - 1 ? ", " : "."))}</p>
        </div>
    );
};

export default Service;