import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DropOutActivity = () => {

    const { activityId } = useParams();

    const [activity, setActivity] = useState({});

    useEffect(() => {
        const getActivity = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios(`http://localhost:5000/activities/find/${activityId}`, {}, {
                    headers: {
                        "Authorization": token
                    }
                });
                setActivity(response.data.activity)
            } catch (err) {
                console.log(err.response.data)
            }
        };

        getActivity();
    }, []);

    return (
        <div>
            <h2 className="mt-5">Quitted</h2>
            <p className="mt-4"> You successfuly quitted the activity {activity.activityName}. </p>
            <p className="mt-4"></p>
            <Link to="/activities">
                <button className="mx-4 my-3 btn btn-info">Go to Activities</button>
            </Link>
        </div >
    )
}

export default DropOutActivity;