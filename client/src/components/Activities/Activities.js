import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../Activities/Activities.css';
import ActivityCard from '../Activities/ActivityCard';

const Activities = () => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const getActivities = async () => {
            const response = await axios("/activities/");
            console.log(response)
            setActivities(response.data.activities);
        }
        getActivities();
    }, [])

    return (
        <div>
            <h2 className="mt-4">Activities</h2>

            {activities.map(test => {
                return (
                    <ActivityCard activity={test} />
                )
            })}
        </div>
    );
};
export default Activities;