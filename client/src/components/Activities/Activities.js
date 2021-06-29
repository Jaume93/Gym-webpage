import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import '../Activities/Activities.css';

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
            <h2 className="mt-4">Activities</h2>

            {activities.map(activity => {
                return (
                    <div className="mt-4">
                        <div class="card bg-dark text-white">
                            <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" class="card-img" alt="picture" />
                            <div class="card-img-overlay">
                                <Link key={activity._id} to={`/activities/find/${activity._id}`}>
                                    <h5 class="card-title">{activity.activityName}</h5>
                                </Link>
                                <p class="card-text">{activity.duration} minutes</p>
                                <p class="card-text">{activity.startTime}</p>
                            </div>
                        </div>
                    </div>);
            })}


        </div>
    );
};
export default Activities;