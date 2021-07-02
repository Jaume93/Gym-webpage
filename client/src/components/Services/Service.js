import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const Service = ({ user, getUser }) => {
    const { serviceId } = useParams();

    let history = useHistory();

    const [service, setService] = useState({});

    useEffect(() => {
        const getService = async () => {
            const response = await axios(`http://localhost:5000/services/find/${serviceId}`);
            setService(response.data.service)
        };
        getService();
    }, []);

    const handlerClickDelete = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.delete(`http://localhost:5000/services/delete/${serviceId}`, {
                headers: {
                    "Authorization": token
                }
            });
            getUser();
            history.push("/");
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <div>
            <p> {service.serviceName}</p>
            <p>Description: {service.description}</p>
            <h3>Fees allowed</h3>
            <p>{service.membFee?.map((fee, i, array) => fee.name + (i < array.length - 1 ? ", " : "."))}</p>
            {user?.role === 1 ? <button>Modify</button> : ""}
            {user?.role === 1 ? <button onClick={handlerClickDelete}>Delete</button> : ""}
        </div>
    );
};

export default Service;