import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Activity = () => {
    const { activityId } = useParams();

    const [activity, setActivity] = useState({});

    useEffect(() => {
        const getActivity = async () => {
            const response = await axios(`http://localhost:5000/activities/find/${activityId}`);
            setActivity(response.data.activity)
        };
        getActivity();
    });

    return (
        <div>
            <p> {activity.activityName}</p>
            <h3>Fees allowed</h3>
            {/* Hacer Loop de cada actividad para coger todas las Fee.
            Cogemos la Fee, su index y la array y si el index es menor que array length entonces pone una , destras de la Fee y sino un . */}
            <p>{activity.membFee?.map((fee, i, array) => fee.name + (i < array.length - 1 ? ", " : "."))}</p>
            <p>Type: {activity.type}</p>
            <p>Duration: {activity.duration} min</p>
            <p>Start Time: {activity.startTime}</p>
            <p>Location: {activity.location}</p>
            <p>Capacity: {activity.maxCapacity}</p>

        </div>
    );
};

export default Activity;