import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

const ModifyActivity = ({ user, getUser }) => {
    const { activityId } = useParams();

    let history = useHistory();

    const [activity, setActivity] = useState({});

    const time = new Date(activity.startTime)

    useEffect(() => {
        const getActivity = async () => {
            const token = localStorage.getItem("token")
            const response = await axios.put(`/activities/modify/${activityId}`, {}, {
                headers: {
                    "Authorization": token
                }
            });
            setActivity(response.data.activity)
        };
        getActivity();
    }, []);
    return (
        <div>
            <h2> {activity.activityName}</h2>
            <p> {activity.description}</p>
            <p>Type: <imput>{activity.type}</imput></p>
            <p>Duration: {activity.duration} min</p>
            <p>
                Start Time: {time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}
            </p>
            <p>Location: {activity.location}</p>
            <p>Capacity: {activity.maxCapacity}</p>
            <h4>Fees allowed</h4>
            {/* Hacer Loop de cada actividad para coger todas las Fee.
            Cogemos la Fee, su index y la array y si el index es menor que array length entonces pone una , destras de la Fee y sino un . */}
            <div>
                {activity.membFee?.map((fee, i, array) => fee.name + (i < array.length - 1 ? ", " : "."))}
            </div>
        </div>
    )
}

export default ModifyActivity;