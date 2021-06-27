import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

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
            <h1>Membership Fees</h1>
            <ul>
                {membershipFees.map(membershipFee => {
                    return (
                        <Link key={membershipFee._id} to={`/membershipFees/find/${membershipFee._id}`}>
                            <li> {membershipFee.name}</li>
                        </Link>
                    );
                })}
            </ul>
        </div >
    );
};

export default MembershipFees;