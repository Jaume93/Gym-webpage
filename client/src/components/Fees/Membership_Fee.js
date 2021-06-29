import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MembershipFee = () => {
    const { membFeeId } = useParams();

    const [membFee, setMembFee] = useState({});

    useEffect(() => {
        const getMembFee = async () => {
            const response = await axios(`http://localhost:5000/membershipFees/find/${membFeeId}`);
            setMembFee(response.data.membFee);
        };
        getMembFee();
    });

    return (
        <div>
            <p> {membFee.name}</p>
            <p> {membFee.pvp} €</p>
            <p> {membFee.description}</p>
        </div>
    );
};

export default MembershipFee;

