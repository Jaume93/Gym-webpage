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
            <p> {activity._id}</p>
            <p> {activity.activityName}</p>
            <p>Type: {activity.type}</p>
            <p>Duration: {activity.duration} min</p>
            <p>Start Time: {activity.startTime}</p>
            <p>Location: {activity.location}</p>
            <p>Capacity: {activity.maxCapacity}</p>
            <p>Fee: {activity.membFee}</p>
        </div>
    );
};

export default Activity;