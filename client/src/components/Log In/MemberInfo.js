import { useEffect, useState } from "react";
import axios from "axios";


const MemberInfo = ({ user }) => {

    return (
        < div >
            {console.log(user)}
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
        </div >
    )
}

export default MemberInfo;