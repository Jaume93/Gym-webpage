import { useEffect, useState } from "react";
import axios from "axios";


const MemberInfo = ({ user, getUser }) => {

    const [member, setMember] = useState();

    useEffect(() => {
        const getMember = async () => {
            const token = localStorage.getItem("token")
            const response = await axios(`http://localhost:5000//members/yourInfo`, {
                headers: {
                    "Authorization": token
                }
            });
            setMember(response.data.member)
        }
        getMember();
    }, [])

    return (
        <div>
            <h2>Privater Area</h2>
            <h4>Personal details</h4>
            <p>{user.name}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <button className="mb-4 btn btn-warning"
                onClick={""}>
                Change
            </button>
            <p>Change password</p>
            <button className="mb-4 btn btn-warning"
                onClick={""}>
                Change
            </button>

            <h4>Membership Fee</h4>
            <p>{user.membFee.name}</p>
            <button className="mb-4 btn btn-warning"
                onClick={""}>
                Change
            </button>


            <button className="mb-4 btn btn-secondary"
                onClick={""}>
                Unsubscribe
            </button>
        </div>
    )
}

export default MemberInfo;