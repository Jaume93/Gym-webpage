import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const ActivitySchedule = () => {
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
        <div className="mt-5">
            <h4>Activity Schedule</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Room A</th>
                        <th>Room B</th>
                        <th>Room C</th>
                        <th>Pool</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => {
                        let time = new Date(activity.startTime)
                        return (
                            <tr>
                                <td>
                                    {/* De la hora de la activity, la hora la convertimos a string si el length es 1 y le añadimos un 0 delante sino no hacemos nada.
                                    de los minutos hacemos lo mismo  */}
                                    {time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}
                                </td>
                                <Link key={activity._id} to={`/activities/find/${activity._id}`}>
                                    <td>
                                        {activity.location === "Room A" ? activity.activityName : ""}
                                    </td>
                                </Link>
                                <td>
                                    {activity.location === "Room B" ? activity.activityName : ""}
                                </td>
                                <td>
                                    {activity.location === "Room C" ? activity.activityName : ""}
                                </td>
                                <td>
                                    {activity.location === "Pool" ? activity.activityName : ""}
                                </td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ActivitySchedule;