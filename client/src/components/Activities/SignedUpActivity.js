import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";

const SignedUpActivity = ({ user, getUser }) => {
    const { activityId } = useParams();

    const history = useHistory();

    const [activity, setActivity] = useState({});

    const time = new Date(activity.startTime)

    useEffect(() => {
        const getActivity = async () => {
            const token = localStorage.getItem("token")
            const response = await axios(`http://localhost:5000/activities/find/${activityId}`, {
                headers: {
                    "Authorization": token
                }
            });
            setActivity(response.data.activity)
        };
        getActivity();
    }, []);

    const handlerClickQuitActivity = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`http://localhost:5000/activities/${activityId}/dropOutActivity/`, {}, {
                headers: {
                    "Authorization": token
                }
            }); console.log(response);
            getUser();
            history.push(`/activity/${activityId}/dropOutActivity`)
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <div>
            <h2 className="mt-5">Signed Up</h2>
            <div className="mt-4">
                You successfuly signed up to the activity <b>{activity.activityName}</b>.
            </div>
            <div className="mt-3">
                The starting time is: <b>{time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}</b>
            </div>
            <div className="my-3">
                Enjoy!
            </div>
            <button
                className="m-4 my-3 btn btn-danger"
                onClick={handlerClickQuitActivity}>
                Quit activity
            </button>
            <Link to="/activities">
                <button className="m-4 my-3 btn btn-info">Go to Activities</button>
            </Link>
        </div >
    )
}

export default SignedUpActivity;