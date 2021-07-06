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
            }); console.log(response.data.activity);
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
            <h2> <b>{activity.activityName}</b></h2>
            <div className="mt-2"> <b>{activity.description}</b></div>
            <div className="mt-2">Type: <b>{activity.type}</b></div>
            <div className="mt-2">Duration: <b>{activity.duration} min</b></div>
            <div className="mt-2">
                Start Time: <b>{time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}
                </b>
            </div>
            <div className="mt-2">Location:<b> {activity.location}</b></div>
            <div className="mt-2">Capacity: <b>{activity.maxCapacity}</b></div>
            <div className="mt-2">Fees allowed:</div>
            {/* Hacer Loop de cada actividad para coger todas las Fee.
            Cogemos la Fee, su index y la array y si el index es menor que array length entonces pone una , destras de la Fee y sino un . */}
            <h3>
                {activity.membFee?.map((fee, i, array) => fee.name + (i < array.length - 1 ? ", " : ""))}
            </h3>

            {console.log(activity.partakers?.indexOf(user?._id) == -1)}
            {user?.role !== 0
                ? ""
                : activity.partakers?.indexOf(user?._id) == -1
                    ? < button
                        className="mx-4 my-3 btn btn-success"
                        onClick={handlerClickTakePart}>
                        Take Part
                    </button>
                    : < button
                        className="mx-4 my-3 btn btn-danger"
                        onClick={handlerClickQuitActivity}>
                        Quit Activity
                    </button>
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