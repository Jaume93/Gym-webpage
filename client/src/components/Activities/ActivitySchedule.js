import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";


const ActivitySchedule = () => {
    const [activities, setActivities] = useState([]);

    const [sortedActivities, setSortedActivities] = useState([]);

    const formatDate = (date) => {
        var date = new Date(date);
        var h = date.getHours();
        var m = date.getMinutes();

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        m = checkTime(m);

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        return `${weekday[date.getDay()].slice(0, 3)} ${date.getDate()} ${month[date.getMonth()]}`;
    }

    useEffect(() => {
        const getActivities = async () => {
            const response = await axios("/api/activities/");
            console.log(response)
            setActivities(response.data.activities);
        }
        getActivities();
    }, [])

    useEffect(() => {
        const sortActivities = () => {
            console.log(activities);
            let array = [];
            activities.forEach(activity => {
                let innerArray = array.find(item => {
                    return item[0].startTime == activity.startTime
                });
                if (innerArray) {
                    innerArray.push(activity)
                } else {
                    let newArray = [activity]
                    array.push(newArray)
                }
            });
            setSortedActivities(array)
        }
        sortActivities();
    }, [activities])

    return (
        <div className="mt-4">
            <h4>Activity Schedule</h4>
            <table className="table table-striped">
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

                    {sortedActivities.map((sameTimeArray, i, array) => {
                        let time = new Date(sameTimeArray[0].startTime);

                        let yesterday

                        if (i > 0) {
                            yesterday = new Date(array[i - 1][0].startTime)
                        }
                        const roomA = sameTimeArray.find(activity => activity.location === "Room A")
                        const roomB = sameTimeArray.find(activity => activity.location === "Room B")
                        const roomC = sameTimeArray.find(activity => activity.location === "Room C")
                        const pool = sameTimeArray.find(activity => activity.location === "Pool")
                        return (
                            <>
                                {i == 0 || time.getDate() > yesterday.getDate() ?
                                    <tr>
                                        <td colSpan='5' className="schedule_date"> {formatDate(time)} </td>
                                    </tr> : ""}
                                <tr>
                                    <td className="align-middle">
                                        {/* De la hora de la activity, la hora la convertimos a string si el length es 1 y le añadimos un 0 delante sino no hacemos nada.
                                    de los minutos hacemos lo mismo */}
                                        {time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}
                                    </td>

                                    <td className="align-middle">
                                        <Link to={`/activities/find/${roomA?._id}`}>
                                            {roomA?.activityName}
                                        </Link>
                                    </td>


                                    <td className="align-middle">
                                        <Link to={`/activities/find/${roomB?._id}`}>
                                            {roomB?.activityName}
                                        </Link>
                                    </td>


                                    <td className="align-middle">
                                        <Link to={`/activities/find/${roomC?._id}`}>
                                            {roomC?.activityName}
                                        </Link>
                                    </td>


                                    <td className="align-middle">
                                        <Link to={`/activities/find/${pool?._id}`}>
                                            {pool?.activityName}
                                        </Link>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                    {/* {activities.map(activity => {
                        let time = new Date(activity.startTime)
                        return (
                            <tr key={activity._id}>
                                <td className="align-middle">
                                    De la hora de la activity, la hora la convertimos a string si el length es 1 y le añadimos un 0 delante sino no hacemos nada.
                                    de los minutos hacemos lo mismo 
                                    {time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}
                                </td>
                                <td >
                                    <Link to={`/activities/find/${activity._id}`}>
                                        {activity.location === "Room A" ? activity.activityName : ""}
                                    </Link>
                                </td>
                                <td >
                                    <Link to={`/activities/find/${activity._id}`}>
                                        {activity.location === "Room B" ? activity.activityName : ""}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/activities/find/${activity._id}`}>
                                        {activity.location === "Room C" ? activity.activityName : ""}
                                    </Link>
                                </td>
                                <td >
                                    <Link to={`/activities/find/${activity._id}`}>
                                        {activity.location === "Pool" ? activity.activityName : ""}
                                    </Link>
                                </td>
                            </tr>);
                    })} */}
                </tbody>
            </table>
        </div>
    )
}

export default ActivitySchedule;