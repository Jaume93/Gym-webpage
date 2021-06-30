import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {

    //const {activity} = props;
    // const activity = props.activity;

    return (
        <Link key={activity._id} to={`/activities/find/${activity._id}`}>
            <div key={activity._id} className="mt-4">
                <div className="card bg-dark text-white">
                    <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="card-img" alt="pict" />
                    <div className="card-img-overlay">

                        <h5 className="card-title">{activity.activityName}</h5>

                        <p className="card-text">{activity.duration} minutes</p>
                        <p className="card-text">{activity.startTime}</p>
                    </div>
                </div>
            </div>
        </Link>)
}

export default ActivityCard;