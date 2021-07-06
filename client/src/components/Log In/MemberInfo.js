// import { useEffect, useState } from "react";
// import axios from "axios";
import '../Log In/MemberInfo.css';

const MemberInfo = ({ user }) => {

    return (
        < div className="my-5">
            {console.log(user)}
            <h2 className="my-4">Privater Area</h2>
            <h4 className="mb-4">Personal details</h4>
            <p className="my-2">{user.name} {user.lastName}</p>
            <p className="my-2">{user.email}</p>
            {/* <button className="mb-4 btn btn-warning"
                onClick={""}>
                Change
            </button>
            <p>Password</p>
            <button className="mb-4 btn btn-warning"
                onClick={""}>
                Change
            </button> */}

            <div className="mt-4">Membership Fee</div>
            <h4>{user.membFee.name}</h4>
            {/* <button className="mb-4 btn btn-warning"
                onClick={""}>
                Change
            </button>

            <button className="mb-4 btn btn-secondary"
                onClick={""}>
                Unsubscribe
            </button> */}
        </div >
    )
}

export default MemberInfo;