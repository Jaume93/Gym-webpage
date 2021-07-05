import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const Activity = ({ user, getUser }) => {
    const { activityId } = useParams();

    let history = useHistory();

    const [activity, setActivity] = useState({});

    const time = new Date(activity.startTime)

    console.log(user);

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

    const handlerClickTakePart = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.put(`http://localhost:5000/activities/${activityId}/signupActivity`, {}, {
                headers: {
                    "Authorization": token
                }
            });
            getUser();
            history.push(`/activity/${activityId}/signedUpActivity`);
        } catch (err) {
            console.log(err.response.data)
        }
    }

    const handlerClickQuitActivity = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.put(`http://localhost:5000/activities/${activityId}/dropOutActivity`, {}, {
                headers: {
                    "Authorization": token
                }
            });
            getUser();
            history.push(`/activity/${activityId}/dropOutActivity`);
        } catch (err) {
            console.log(err.response.data)
        }
    }

    const handlerClickModify = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.put(`http://localhost:5000/activities/modify/${activityId}`, {}, {
                headers: {
                    "Authorization": token
                }
            });
            getUser();
            history.push("/modify/activity/${activityId}");
        } catch (err) {
            console.log(err.response.data)
        }
    }

    const handlerClickDelete = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.delete(`http://localhost:5000/activities/delete/${activityId}`, {
                headers: {
                    "Authorization": token
                }
            });
            getUser();
            history.push("/");
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <div className="mt-4">
            <h2> {activity.activityName}</h2>
            <p> {activity.description}</p>
            <p>Type: {activity.type}</p>
            <p>Duration: {activity.duration} min</p>
            <p>
                Start Time: {time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}
            </p>
            <p>Location: {activity.location}</p>
            <p>Capacity: {activity.maxCapacity}</p>
            <div>Fees allowed:</div>
            {/* Hacer Loop de cada actividad para coger todas las Fee.
            Cogemos la Fee, su index y la array y si el index es menor que array length entonces pone una , destras de la Fee y sino un . */}
            <h3>
                {activity.membFee?.map((fee, i, array) => fee.name + (i < array.length - 1 ? ", " : ""))}
            </h3>

            {user?.role === 0 /* && user !== activity.partakers._id*/ ? < button
                className="mx-4 my-3 btn btn-success"
                onClick={handlerClickTakePart}>
                Take Part
            </button> : ""
            }

            {user?.role === 0 ? < button
                className="mx-4 my-3 btn btn-danger"
                onClick={handlerClickQuitActivity}>
                Quit Activity
            </button> : ""
            }

            {user?.role === 1 ? <button
                className="mx-4 my-3 btn btn-warning"
                onClick={handlerClickModify}>
                Modify
            </button> : ""
            }


            {user?.role === 1 ? <button
                className="mx-4 my-3 btn btn-danger"
                onClick={handlerClickDelete}>
                Delete
            </button> : ""
            }
        </div >
    );
};

export default Activity;