import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DropOutActivity = () => {

    const { activityId } = useParams();

    const [activity, setActivity] = useState({});

    useEffect(() => {
        const getActivity = async () => {
            const token = localStorage.getItem("token")
            const response = await axios.put(`http://localhost:5000/activities/${activityId}/dropOutActivity`, {
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
            <h2>Signed Up</h2>
            <div>
                You successfuly quitted the activity {activity.activityName}.
            </div>

            <Link to="/activities">
                <button className="mx-4 my-3 btn btn-danger">Go to Activities</button>
            </Link>
        </div >
    )
}

export default DropOutActivity;