import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import '../Fees/Fees.css';

const MembershipFees = () => {

    const [membershipFees, setMembershipFees] = useState([]);

    useEffect(() => {
        const getMembershipFees = async () => {
            const response = await axios("http://localhost:5000/membershipFees/");
            setMembershipFees(response.data.membershipFees);
        }
        getMembershipFees();
    }, [])

    return (
        <div>
            <h2 className="mt-5">Membership Fees</h2>
            <ul>
                {membershipFees.map(membershipFee => {
                    return (
                        <div key={membershipFee._id} >
                            <h3 className="mt-5"> {membershipFee.name}</h3>
                            <Link to={`/membershipFees/find/${membershipFee._id}`}>
                                <button className=" my-2 btn btn-info">More Info</button>
                            </Link>
                        </div>
                    );
                })}
            </ul>
        </div >
    );
};

export default MembershipFees;