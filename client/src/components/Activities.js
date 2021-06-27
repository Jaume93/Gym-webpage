import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Activities = () => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const getActivities = async () => {
            const response = await axios("http://localhost:5000/activities/");
            console.log(response)
            setActivities(response.data.activities);
        }
        getActivities();
    }, [])

    return (
        <div>
            <h1>Activities</h1>
            <ul>
                {activities.map(activity => {
                    return (
                        <Link key={activity._id} to={`/activities/find/${activity._id}`}>
                            <li> {activity.activityName}</li>
                        </Link>
                    );
                })}
            </ul>
        </div >
    );
};

export default Activities;