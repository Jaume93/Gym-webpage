import { Link } from "react-router-dom";
import '../Activities/Activities.css';

const ActivityCard = ({ activity }) => {
    //const {activity} = props;
    // const activity = props.activity;

    const time = new Date(activity.startTime)

    return (
        <Link key={activity._id} to={`/activities/find/${activity._id}`}>
            <div key={activity._id} className="mt-4">
                <div className="card bg-dark text-white">
                    <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="card-img" alt="pict" />
                    <div className="card-img-overlay">

                        <h2 className="card-title">{activity.activityName}</h2>

                        <h5 className="card-text">{activity.duration} minutes</h5>
                        <h5 className="card-text">Start : {time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}</h5>
                    </div>
                </div>
            </div>
        </Link>)
}

export default ActivityCard;