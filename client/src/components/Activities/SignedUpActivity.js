import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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

    const handlerClickRemoveFromActivity = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`http://localhost:5000/activities/${activityId}/dropOutActivity/`, {
                headers: {
                    "Authorization": token
                }
            });
            getUser();
            history.push(`/activity/${activityId}/dropOutActivity`)
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <div>
            <h2>Signed Up</h2>
            <div>
                You successfuly signed up to the activity {activity.activityName}.
            </div>
            <div>
                The starting time is: {time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}.
            </div>
            <div>
                Enjoy!
            </div>
            <button
                className="mx-4 my-3 btn btn-danger"
                onClick={handlerClickRemoveFromActivity}>
                Remove from activity
            </button>
        </div >
    )
}

export default SignedUpActivity;