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
            <h2>Membership Fees</h2>
            <ul>
                {membershipFees.map(membershipFee => {
                    return (
                        <div>
                            <p> {membershipFee.name}</p>
                            <p>{membershipFee.pvp}€</p>
                            <Link key={membershipFee._id} to={`/membershipFees/find/${membershipFee._id}`}>
                                <button>More Info</button>
                            </Link>
                        </div>
                    );
                })}
            </ul>
        </div >
    );
};

export default MembershipFees;